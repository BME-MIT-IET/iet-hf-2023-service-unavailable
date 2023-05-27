# UI tesztelés

A UI tesztek készítésére a Cypress JavaScript könyvtárat használtuk. Ez egy nyílt forráskódú csomag, amely segítségével html elemeken tudunk kódban műveleteket végezni, mintha azt billentyűzeten és egérrel tennénk. A html elemeket CSS selectorokkal keressük meg az adott oldalon. A csomagot npm-mel telepítettük, majd ezután az `npx cypress open` parancs kiadásával tudjuk a cypresst inicializálni, majd ezután ugyanezzel a paranccsal lehet a tesztfelületet megnyitni. A böngésző kiválasztása után itt futtathatjuk a megírt teszteket. A .cy.js fájlokat tudjuk futtatni. A `describe` függvénnyel definiálhatunk teszt csoportokat, melyeken belül az `it` függvénnyel adhatunk meg konkrét teszteket. Ha van valami, amit egy `describe`-on belül minden teszteset előtt véghez szeretnénk vinni, akkor azt a `beforeEach` függvénnyel tehetjük meg.
A cypress lehetőséget biztosít a különböző elemek érték szerinti vizsgálatára, mind egyezés, mind tartalmazás terén, ezenkívül az oldalak közötti navigációt is ellenőrizni tudja.
Fontos, hogy minden műveletet aszinkron hajt végre, erre oda kell figyelni a tesztek elkészítésekor.
Pár példa:
- Felhasználói akció:
    - `cy.get('#newRouteBtn').click()` Megkeresi az oldalon a 'newRouteBtn' id-jű elemet, majd megpróbál rákattintani
    - `cy.get('#length').type('123')` Megkeresi az oldalon a 'length' id-jű elemet, majd karakterenként beleírja, hogy '123'
- Ellenőrzés:
    - `cy.url().should('equal', 'http://localhost:3000/routes/new')` Ellenőrzi, hogy az adott oldal url-je megegyezik-e a megadottal, jelen esetben http://localhost:3000/routes/new -e
    - `cy.get('#runningDiv').contains('15:25:36').should('not.exist')` Ellenőrzi, hogy a 'runningDiv' nem tartalmazza '15:25:36'-t

A tesztek alatt minden útvonalat bejártunk.
A tesztelés során teszteltünk minden lehetséges felhasználói műveletet:
- olvasás
- létrehozás
- módosítás
- törlés
- sorbarendezés

Ezeket megfelelő és hibás formátumú bemenetekkel is teszteltük. Ezenkívül a képernyőn megjelenő feliratok helyességét, a megfelelő visszajelzés és hibaüzenetek meglétét is ellenőriztük.

A tesztek a következők:
- fő oldal:
    - útvonal létrehozása
    - útvonal módosítása
    - útvonal módosítása, miközben hibás adatokat adunk meg, ezeknél az megfelelő errorok ellenőrzése
    - útvonal törlése
    - útvonal törlése, de tényleges törlés helyett a törlés megszakítása
    - útvonalak táblázaton belüli sorbarendezése
    - az útvonalak oldalain található szövegek ellenőrzése

- teljesítések oldala:
    - útvonal létrehozása után eljutás a teljesítés oldalra
    - teljesítés létrehozása, megszakítással és ténylegesen is
    - teljesítés létrehozása, miközben hibás adatokat adunk meg, ezeknél az megfelelő errorok ellenőrzése
    - több teljesítés létrehozása, ezek megfelelő helyre és sorba kerülése, emellett a főoldalon megjelenő adatok pontosságának ellenőrzése
    - teljesítés módosítása, megszakítással és ténylegesen is
    - teljesítés módosítása, miközben hibás adatokat adunk meg, ezeknél az megfelelő errorok ellenőrzése
    - teljesítés törlése, megszakítással és ténylegesen is
    - teljesítés oldal tartalmának ellenőrzése


A tesztek a rendszer néhány apróbb hibáját előhozták, ezek a következőek:
- A Főoldalon az Útvonalak neve szerinti sorbarendezés helytelenül működik
- Az útvonal hosszának, illetve egy teljesítés időtartamának negatív számot is lehet adni
- Az időtartamra formátum ellenőrzése hiányos, akármilyen számot lehet órának, percnek és másodpercnek adni
- Teljesítés hozzáadásakor nem az aktuális útvonal neve jelenik meg, hanem egy konstans hard-coded szöveg

Ezen hibák egyszerűen javíthatóak, azonban egy éles rendszerben ezek jelenléte figyelmetlenségre utal, és az időtartamok akár még súlyos problémát is okozhatnak.
A megtalálásuk az UI teszteken kívül esetleg az oldal manuális végigjárásával történhetett volna, azonban ez a módszer esetén az emberi tényező nagyobb.
Így az elkészített tesztek mindenképp hasznosak és fontos problémákat tártak fel.

Mivel a feladatunk nem ezen hibák kijavítása, hanem a tesztekkel a potenciális hibák felfedezése volt - ami sikerült - ezért ezeket nem javítottuk ki a projektben.
