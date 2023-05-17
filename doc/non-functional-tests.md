# Nem-funkcionális jellemzők vizsgálata 
A weboldal nem funkcionális jellemzőit fogom elemezni különböző szempontok alapján.

## Biztonság 
Manapság egy egyszerű webalkalmazásnak is fel kell készülnie a támadók ellen. Most a leggyakoribb támadási technikákat fogom kipróbálni az alkalmazáson és elemzem az eredményeket

### XSS scripting
A Cross-Site scripting alapú támadások nagyon gyakoriak a többfelhasználós weboldalak esetén. Ennek lényege, hogy a támadó egy rossz indulató kódot injektál egy megbízható weboldalba, ami le tud futni az eredeti weboldalban megbízó felhasználó gépén ezzel kárt okozva neki.

Első megközelítésben a weboldal forráskódjában megnéztem, hogy hol használták az innerHtml attribútumot. A leggyakoribb hiba, hogy a fejlesztő elmenti az adatbázsiba egy szöveges mező tartalmát, majd megjeleníti azt egy innerHtml tag-ben. Ilyenkor ha egy rosszindulató kódod írunk a mezőbe, az lefuthat a felhasználók gépén.

Potenciális hibalehetőségek vizsgálata:
 - Egy felhasználó által beírt mező berakása a html tagbe:
     - Potenciális veszélyforrás
        - ```html
            <div class="modal-body" id="modal-body">
                Biztosan törlöd a(z) <%= route.name %> útvonalat? Ezzel a hozzá tartozó teljesítések is törlődnek.
                    Ezt később nem tudod visszavonni!
            </div>
            ```
     - Injektált kód:
        - ```html
            </h5><iframe src="javascript:alert(0)"></iframe><h5>
            ```
     - Eredmény:
        - ```html
            <h5 class="modal-title" id="modal-title">Útvonal törlése - &lt;/h5&gt;&lt;iframe src="javascript:alert(0)"&gt;&lt;/iframe&gt;&lt;h5&gt;</h5>
            ```
     - Magyarázat:
         - Az EJS leveszi a terhet a fejlesztők válláról, és saját kódolást használ. Így hiába került be az adatbázisba a veszélyes kódrészlet az EJS átkódolásának köszönhetően nem fut le, csak megjelenik szövegként.

- Felhasználó által beírt adat megjelenítése JS oldalról az innerHtml attribútummal 
     - Potenciális veszélyforrás:
         - ```javascript
            document.getElementById('modal-body').innerHTML =
                bodyPrefix + ` ${name}, ${time}` + bodyPostfix
            ```
    - Injektált kód:    
        - ```html
            </h5><iframe src="javascript:alert(0)"></iframe><h5>
            ```
    - Eredmény
        - ```html
            <div class="modal-body" id="modal-body">Biztosan törlöd ezt a teljesítést?  "&lt;iframe src="javascript:alert(0)"&gt;&lt;/iframe&gt;", 11:11:11 Ezt később nem tudod visszavonni!</div>
            ```
    - Magyarázat:
         - AZ EJS fordított irányban is használja a speciális karakterek átkodólását, így hiába került be a veszélyes kód az adatbázisba, ez a felhasználói felületen ismét nem tud lefutni

### NoSQL injection
Mivel az alkalmazás NoSQL mongodb-t használ, így nincs lehetőség SQL injection alapú támadásokra. Azonban a dokumentum alapú adatbázisoknál is figyelni kell a hasonló támadásokra. Az ilyen támadásokat hívjuk NoSQL injectionnek.

Potenciális hibalehetőségek vizsgálata:
- Route-ban kapott id alapján való törlés
    - Potenciális veszélyforrás:
        - ```javascript
            or.EffortModel.deleteMany({ _route: res.locals.route._id }, (err) => {
                if (err) {
                    return next(err)
                }
                return next()
            })
            ```
    - Magyarázat
        - Nem okoz gondot, mert ha nem adok meg id-t, akkor a routing miatt nem is jut el idáig a kérés. Így az összes adat törlésére, vagy az adatbázis inkonzisztens állapotba való mozgatására nincs lehetőség.
- Enum típus ellenőrzése
    - Potenciális veszélyforrás:
        - ```javascript
            if (Number.isNaN(parseInt(req.body.type))) {
                errors.push('Érvénytelen teljesítési mód!')
            } else if (req.body.type < 1 || req.body.type > 3) {
                errors.push('Érvénytelen teljesítési mód!')
            }
            ```
        - Select option value átírása:
            ```html
            <select class="form-select" id="type" name="type">
                <option value="0" disabled="" selected="">Válassz sportot...</option>
                <option value="1.5">Túra</option>
                <option value="2">Futás</option>
                <option value="3">Kerékpározás</option>
            </select>
            ```
        - Eredmény:
            ```json
                {"name":"teszt","time":"11:11:61","type":"1.5"}
            ```
        - Magyarázat:
            - Egy tört érték átmegy az enum ellenőrzésen, pedig egyértelműen hibás érték. Mivel a mondodb megengedi, hogy ennél a rekordnál tört érték legyen egész helyett, nem okoz problémát.
            - Komoly veszélyforrást nem jelent ez a hiányosság, de akár az alkalmazás crashelését is okozhatja.
            - Az időt sem ellenőrzi megfelelően, így sikerült egy érvénytelen adatot megadni. Ez szintén az alkalmazás összeomlását eredményezheti.

## Teljesítmény tesztelése
Ellenőrzöm, hogy milyen sebességgel tud sok kérést kiszolgáli a szervert. Ehhez a [loadtest](https://www.npmjs.com/package/loadtest) és [artillery](https://www.npmjs.com/package/artillery) librarykat fogom használni.

- Főoldal betöltési ideje loadtest:
    - Kiadott parancs: \
        ```loadtest -c 10 --rps 200 http://localhost:3000```
    - Eredmény: \
        ```console
        [Wed May 17 2023 14:36:59 GMT+0200 (közép-európai nyári idő)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
        [Wed May 17 2023 14:37:04 GMT+0200 (közép-európai nyári idő)] INFO Requests: 632, requests per second: 126, mean latency: 657.6 ms
        [Wed May 17 2023 14:37:09 GMT+0200 (közép-európai nyári idő)] INFO Requests: 1362, requests per second: 146, mean latency: 1996.7 ms
        [Wed May 17 2023 14:37:14 GMT+0200 (közép-európai nyári idő)] INFO Requests: 2146, requests per second: 157, mean latency: 3144.1 ms
        [Wed May 17 2023 14:37:19 GMT+0200 (közép-európai nyári idő)] INFO Requests: 3030, requests per second: 176, mean latency: 4006.8 ms
        [Wed May 17 2023 14:37:24 GMT+0200 (közép-európai nyári idő)] INFO Requests: 3954, requests per second: 185, mean latency: 4485.8 ms
        [Wed May 17 2023 14:37:29 GMT+0200 (közép-európai nyári idő)] INFO Requests: 4892, requests per second: 188, mean latency: 4764.3 ms
        [Wed May 17 2023 14:37:34 GMT+0200 (közép-európai nyári idő)] INFO Requests: 5772, requests per second: 176, mean latency: 5239.3 ms
        [Wed May 17 2023 14:37:39 GMT+0200 (közép-európai nyári idő)] INFO Requests: 6610, requests per second: 168, mean latency: 5911.5 ms
        [Wed May 17 2023 14:37:44 GMT+0200 (közép-európai nyári idő)] INFO Requests: 7443, requests per second: 167, mean latency: 6948 ms
        [Wed May 17 2023 14:37:49 GMT+0200 (közép-európai nyári idő)] INFO Requests: 8324, requests per second: 176, mean latency: 7588.2 ms
        [Wed May 17 2023 14:37:54 GMT+0200 (közép-európai nyári idő)] INFO Requests: 9201, requests per second: 176, mean latency: 8105.8 ms
        [Wed May 17 2023 14:37:59 GMT+0200 (közép-európai nyári idő)] INFO Requests: 10093, requests per second: 178, mean latency: 8690.1 ms
        ```
    - Magyarázat:
        - Ebből láthatjuk hogy a szerver kb. 180 kérést tud kiszolgálni egy másodperc alatt. Ez a teljesítmény ennél az alkalmazásnál megfelelő, viszont nem skálázható. Ezen javítani az alkalmazás  újraírása nélkül nem lehet.
- Főoldal betöltési ideje artillery:
    - Kiadott parancs: \
        ```artillery quick --count 20 --num 100 http://localhost:3000```
    - Eredmény: \
        ```console
        --------------------------------------
        Metrics for period to: 15:00:10(+0200) (width: 3.787s)
        --------------------------------------

        http.codes.200: ................................................................ 1381
        http.request_rate: ............................................................. 371/sec
        http.requests: ................................................................. 1401
        http.response_time:
        min: ......................................................................... 4
        max: ......................................................................... 70
        median: ...................................................................... 49.9
        p95: ......................................................................... 58.6
        p99: ......................................................................... 63.4
        http.responses: ................................................................ 1381
        vusers.created: ................................................................ 20
        vusers.created_by_name.0: ...................................................... 20


        --------------------------------------
        Metrics for period to: 15:00:20(+0200) (width: 1.528s)
        --------------------------------------

        http.codes.200: ................................................................ 619
        http.request_rate: ............................................................. 393/sec
        http.requests: ................................................................. 599
        http.response_time:
        min: ......................................................................... 3
        max: ......................................................................... 59
        median: ...................................................................... 40.9
        p95: ......................................................................... 50.9
        p99: ......................................................................... 55.2
        http.responses: ................................................................ 619
        vusers.completed: .............................................................. 20
        vusers.failed: ................................................................. 0
        vusers.session_length:
        min: ......................................................................... 3894.8
        max: ......................................................................... 4677.2
        median: ...................................................................... 4492.8
        p95: ......................................................................... 4676.2
        p99: ......................................................................... 4676.2


        All VUs finished. Total time: 7 seconds

        --------------------------------
        Summary report @ 15:00:13(+0200)
        --------------------------------

        http.codes.200: ................................................................ 2000
        http.request_rate: ............................................................. 382/sec
        http.requests: ................................................................. 2000
        http.response_time:
        min: ......................................................................... 3
        max: ......................................................................... 70
        median: ...................................................................... 47.9
        p95: ......................................................................... 57.4
        p99: ......................................................................... 63.4
        http.responses: ................................................................ 2000
        vusers.completed: .............................................................. 20
        vusers.created: ................................................................ 20
        vusers.created_by_name.0: ...................................................... 20
        vusers.failed: ................................................................. 0
        vusers.session_length:
        min: ......................................................................... 3894.8
        max: ......................................................................... 4677.2
        median: ...................................................................... 4492.8
        p95: ......................................................................... 4676.2
        p99: ......................................................................... 4676.2
        ```
    - Magyarázat:
        - Ebben az esetben kicsit jobban teljesített az alkalmazás. Az átlagos válaszidő is megfelelő.