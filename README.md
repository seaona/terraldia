# Terrassa Al Dia
## Projecte
Aquest és un projecte sense ànim de lucre, amb l'objectiu de mantenir els egarencs i les egarenques informats sobre l'estat del COVID-19 en relació a la ciutat. 

https://terrassa-al-dia.herokuapp.com/

## Motivació
Aquest projecte és una iniciativa personal motivada per les ganes d'aportar el meu granet de sorra en la situació excepcional que estem vivint.
## Font de Dades
Aquest projecte es nutreix de l'API facilitada per la Generalitat de Catalunya i les dades provenen del registre RSAcovid19 del Dept. de Salut
## Codi Obert
El codi és accessible per a tothom i pot ser re-utilitzat sota la llicència MIT. Fàcilment es pot fer la implementació per a d'altres municipis.
## Funcionalitats
- [x] Agafar dades més recents de l'API oberta
- [x] Búsqueda específica per data
- [ ] Calendari per introduir data
- [ ] Error Handling en la validació dels inputs
- [ ] Refactorització del codi 
- [ ] Visualització de dades al llarg del temps
- [ ] Comparativa amb dades de demografia de Terrassa

## Implementació per al teu Municipi
### Set-up
1. Clona el repositori a una carpeta local

```git clone https://github.com/seaona/terraldia.git```

2. Fes cd a la carpeta i instal·la les dependències

```npm install```

3. Crea un arxiu (dins Terrassa) anomenat .env i afegeix el localhost on vulguis que s'inicii el servidor, dins l'arxiu. Per exemple, pots copiar i enganxar el següent:

```BASE_URL=http://localhost:8080```

4. Inicia el servidor 

```npm run start```

5. Si el servidor s'ha iniciat correctament, veuràs un missatge a la consola del Terminal. Ara pots obrir un navegador i anar a l'adreça http://localhost:8080 per a veure el projecte. 

### Modifica la font de dades
1. Dins de l'arxiu index.js trobaràs tota la lògica de l'aplicació. A l'inici es defineixen les URLs per obtenir les dades de Terrassa. Observa que n'hi ha vàries, ja que Terrassa està dividida en 6 zones (TerrassaA - ... TerrassaF). Canvia les URLs per les del teu municipi (pot ser que n'hi hagi una o vàries).

2. Canvia el disseny del front als arxius de la carpeta Views:
- landing.ejs
- footer.ejs
- header.ejs

3. Opcional: si vols afegir més mètriques, gràfics, etc. consulta totes les dades disponibles a la [API de la Generalitat](https://analisi.transparenciacatalunya.cat/Salut/Registre-de-casos-de-COVID-19-realitzats-a-Catalun/xuwf-dxjd).
