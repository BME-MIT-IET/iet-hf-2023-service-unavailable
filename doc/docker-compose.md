# Dockerizáció
## Konténerizáció
A konténerizáció nagyban megkönnyítette a fejlesztési folyamatot "Az én gépemen még működött" kijelentések minimalizálásával. A Docker technológia használatával egy előre definiált környezetben tudunk programot futtatni, a virtuális gépek overhead-je nélkül.

## Dockerfile
A Docker a *Dockerfile* nevű fájl alapján tudja automatikusan létrehozni a futtatható *image*-t.

Itt adtam meg, hogy hogyan lehet futtatni a NodeJs alkalmazást. Először át kellett másolni a megfelelő mappába a forrásfájlokat és függőségek listáját, ami alapján le tudja tölteni a megfelelő csomagokat. Itt állítottam be, hogy az általános 3000-es porton hirdesse magát. Miután mindent beállítottam, az alkalmazás futtatásával elérhető lett localhoston.

## docker.compose.yml
A Docker compose technológiával tudjuk futtatni a több *image*-ből álló konténereinket. Könnyen meg tudjuk adni a szolgáltatások függőségeit.

Itt tudtam megadni, hogy a futtatandó alkalmazásunk egy weboldal, ami egy adatbázisra épül. Ennek a futtatásával automatikusan elindul az összes szolgáltatás, nem kell külön foglalkoznunk velük.

## .dockerignore
Itt tudtam megadni, hogy a *node_modules* mappát ne másolja az *image*-re.

## Tanulság
A konténerizáció előtt manuálisan kellett létrehozni egy lokális *.env* fájlt, amivel megadtuk a webszervernek, hogy hogyan éri el az adatbázist, amit a Docker compose segítségével kiváltottunk.

Ezzel nagyban egyszerűsödött a csapat együttműködése, ugyanis a konténer elindításával egyből tudjuk használni.