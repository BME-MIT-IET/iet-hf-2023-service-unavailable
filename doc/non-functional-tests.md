# Nem-funkcionális jellemzők vizsgálata 
A weboldal nem funkcionális jellemzőit fogom elemezni különböző szempőontok alapján

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

- Felhasználó által beírt adat megjelnítése JS oldalról az innerHtml attribútummal 
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
         - AZ EJS fordított irányban is használja a speciális karakterek átkodólását, így hiába került be a veszélyes kód az adatbázisba, ez a felhasználói felületen nem tud lefutni

### NoSQL injection
Mivel az alkalmazás NoSQL mongodb-t használ, így nincs lehetőség SQL injection alapú támadásokra. Azonban a dokumentum alapú adatbázisoknál is figyelni kell a hasonló támadásokra. Az ilyen támadásokat hívjuk NoSQL injectionnek.
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
- Enum tíous ellenőrzése
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
                {"name":"asdasd","time":"11:11:11","type":"1.5"}
            ```
        - Magyarázat:
            - Egy tört érték átmegy az enum ellenőrzésen, pedig egyértelműen hibás érték. Mivel a mondodb megengedi, hogy ennél a rekrdnál tört érték legyen egész helyett, nem okoz problémát.
            - Komoly veszélyforrást nem jelent ez a hiányosság, de akár az alkalmazás craschelését is okozhatja.