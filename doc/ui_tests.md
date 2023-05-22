# UI tesztelés

A UI tesztek készítésére a Cypress JavaScript könyvtárat használtuk. Ez egy nyílt forráskódú csomag, amely segítségével html elemeken tudunk kódban műveleteket végezni, mintha azt billentyűzeten és egérrel tennénk.
A csomagot npm-mel telepítettük, majd ezután az `npx cypress open` parancs kiadásával tudjuk a cypresst inicializálni, majd ezután ugyanezzel a paranccsal lehet a tesztfelületet megnyitni. A böngésző kiválasztása után itt futtathatjuk a megírt teszteket.
A cypress lehetőséget biztosít a különböző elemek érték szerinti vizsgálatára, mind egyezés, mind tartalmazás terén, ezenkívül az oldalak közötti navigációt is ellenőrizni tudja.
Fontos, hogy minden műveletet aszinkron hajt végre, erre oda kell figyelni a tesztek elkészítésekor.

A tesztek alatt minden útvonalat bejártunk.
A tesztelés során mindkét entitással végrehajtható minden műveletet teszteltünk:
- hozzáadást
- módosítást
- törlést
- sorbarendezést
Ezeket megfelelő és hibás formátumú bemenetekkel is teszteltük.  Ezenkívül a képernyőn megjelenő feliratok helyességét, a megfelelő visszajelzés és hibaüzenetek meglétét is ellenőriztük. 

A tesztek a rendszer néhány apróbb hibáját előhozták, ezek a következőek:
- A Főoldalon az Útvonalak neve szerinti sorbarendezés helytelenül működik
- Az útvonal hosszának, illetve egy teljesítés időtartamának negatív számot is lehet adni
- Az időtartamra semmilyen formátom ellenőrzés nincsen, akármilyen számot lehet órának, percnek és másodpercnek adni
- Teljesítés hozzáadásakor nem az aktuális útvonal neve jelenik meg, hanem egy konstans szöveg

Ezen hibák egyszerűen javíthatóak, azonban egy éles rendszerben ezek jelenléte figyelmetlenségre utal, és az időtartamok akár még súlyos problémát is okozhatnak.
A megtalálásuk az UI teszteken kívül esetleg az oldal manuális végigjárásával történhetett volna, azonban ez a módszer esetén az emberi tényező nagyobb.
Így az elkészített tesztek mindenképp hasznosok és fontos problémákat tártak fel.
