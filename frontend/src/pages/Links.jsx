import { Box, Link, List, ListItem, Typography, Grid } from '@mui/material'

const Links = () => (
  <Grid sx={{ background: '#FEF6E1' }} container direction="column" justifyContent="center" alignItems="center">
    <Box sx={{ p: 5 }} >
      <Typography sx={{ pb: 3 }} variant='h3'>Hyödyllisiä linkkejä</Typography>
      <List>
        <ListItem>
          <Typography>
              Lue lisää yhdessä kirjoittamisesta:
            <Link sx={{ pl: 0.5 }} href="https://webcgi.oulu.fi/oykk/abc/kirjoittamisprosessi/yhdessa_kirjoittaminen_ja_yhteiskirjoittaminen/" target="_blank" rel="noopener noreferrer">(Kirjoittajan ABC)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography id='testlink'>
              Lue lisää motivaatiosta ja tavoitteiden asettamisesta:
            <Link sx={{ pl: 0.5 }} href='https://gradutakuu.fi/sisallys/' target="_blank" rel="noopener noreferrer">(Gradutakuu)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue lisää akateemisista tekstitaidoista:
            <Link sx={{ pl: 0.5 }} href ='https://kokonaisvaltainenkirjoittaminen.fi/2011/02/15/akateemisen-kirjoittamisen-opetus/' target="_blank" rel="noopener noreferrer">(Kokonaisvaltainen kirjoittaminen -blogi)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
          Lue akateemisista käytänteistä e-kirjasta <a href='https://www.ellibslibrary.com/book/9789523455115' target="_blank" rel="noopener noreferrer">Tiede ja teksti - Tehoa ja taitoa tutkielman kirjoittamiseen</a> (lainattavissa Haka-tunnuksilla ja kirjastoista) <br />
          Tieteellisen tekstin rakenne ja argumentointi (luvut 4 ja 5) <br />
          Argumentointi, referointi ja viittaaminen (luvut 5 ja 6) <br />
          Tieteellinen referointi (luku 6) <br />
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue lisää palautteesta:
            <Link sx={{ pl: 0.5 }} href = 'http://www.plotti.fi/2020/08/14/palautetta-hopeatarjottimella-vaikuta-palautekokemuksiisi/' target="_blank" rel="noopener noreferrer">(Plotti)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue kirjoittamisen sosiaalisesta luonteesta:
            <Link sx={{ pl: 0.5 }} href='https://antroblogi.fi/2017/06/sinun-tekstisi-ei-ole-sinun/' target="_blank" rel="noopener noreferrer">(Sinun tekstisi ei ole sinun)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Tukea tekstin viimeistelyyn:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/kielijelppi/viimeistely/' target="_blank" rel="noopener noreferrer">(Kielijelppi)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Kangertaako kandityö?:
            <Link sx={{ pl: 0.5 }} href='http://www.plotti.fi/2018/01/29/kangertaako-kandityo/' target="_blank" rel="noopener noreferrer">(Plotti)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Miten vähentää prokrastinaatiota?:
            <Link sx={{ pl: 0.5 }} href='https://www.nyyti.fi/opiskelijoille/opi-elamantaitoa/ajanhallinta/prokrastinaatio/miten-vahentaa-prokrastinaatiota/' target="_blank" rel="noopener noreferrer">(Nyyti ry)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Kokeile vapaan kirjoittamisen tekniikoita:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/kielijelppi/ideointivaihe/' target="_blank" rel="noopener noreferrer">(Kielijelppi)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Jos sinua mietityttää esim. lukivaikeuteen tai mielen hyvinvointiin liittyvät asiat, saat lisätietoa korkeakoulusi verkkosivuilta:
            <a href='https://studies.helsinki.fi/ohjeet/artikkeli/opiskelun-tueksi' target="_blank" rel="noopener noreferrer"> (HY)</a> <a href='https://www.utu.fi/fi/opiskelijaksi/opiskelijan%20palvelut%20ja%20hyvinvointi' target="_blank" rel="noopener noreferrer">(TY)</a> <a href='https://www.tuni.fi/fi/opiskelijan-opas/tampereen-yliopiston-opiskelijan-opas/opiskelijoiden-hyvinvointi' target="_blank" rel="noopener noreferrer">(TUNI)</a> <a href='https://www.jyu.fi/fi/opiskelijalle/hyvinvointi/apua-ja-tukea-opiskeluhyvinvointiin'target="_blank" rel="noopener noreferrer">(JYU)</a> <a href='https://kamu.uef.fi/tietopankki/uudelle-opiskelijalle/palveluita-opintojen-alussa/' target="_blank" rel="noopener noreferrer">(UEF)</a> <a href='https://www.uwasa.fi/fi/opiskelijat' target="_blank" rel="noopener noreferrer">(VY)</a> <a href='https://www.oulu.fi/fi/opiskelijalle/tukea-opiskeluun' target="_blank" rel="noopener noreferrer">(OY)</a> <a href='https://www.ulapland.fi/FI/Opiskelu/Ohjaus-ja-hyvinvointi' target="_blank" rel="noopener noreferrer">(LY)</a> <br />
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link sx={{ pl: 0.5 }} href='http://www.kielitoimistonohjepankki.fi/' target="_blank" rel="noopener noreferrer">Kielitoimiston ohjepankki</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Millaisia tekstilajeja opiskelija tarvitsee:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/kielijelppi/opiskelijoiden-tekstilajeja/' target="_blank" rel="noopener noreferrer">(Kielijelppi)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Akateeminen essee for dummies:
            <Link sx={{ pl: 0.5 }} href='http://www.plotti.fi/2021/02/23/akateeminen-opiskeluessee-for-dummies/' target="_blank" rel="noopener noreferrer">(Plotti)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
          Lukeminen ja referoiminen:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/kielijelppi/lukeminen-ja-referoiminen/' target="_blank" rel="noopener noreferrer">(Kielijelppi)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
          Tiedon käyttö ja arviointi:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/opiskelijan-digitaidot/3-tiedonhankinta/3-4-loydetyn-tiedon-kaytto-ja-arviointi/' target="_blank" rel="noopener noreferrer">(Opiskelijan digitaidot)</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link sx={{ pl: 0.5 }} href='https://tiedelukutaito.mooc.fi/part-5/2-lahteiden-kaytto-ja-tekijanoikeudet' target="_blank" rel="noopener noreferrer">Lähteiden käyttö ja tekijänoikeudet</Link>
          </Typography>
        </ListItem>
      </List>
    </Box>
  </Grid>
)

export default Links