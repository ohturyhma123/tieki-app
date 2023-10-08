import { Box, Link, List, ListItem, Typography } from '@mui/material'

const Links = () => (
  <Box sx={{ p: 4 }} >
    <Typography variant='h3'>Hyödyllisiä linkkejä</Typography>
    <List>
      <ListItem>
        <Typography sx={{ pr: 0.5 }} display='inline'>
            Lue lisää yhdessä kirjoittamisesta:
          <Link href="https://webcgi.oulu.fi/oykk/abc/kirjoittamisprosessi/yhdessa_kirjoittaminen_ja_yhteiskirjoittaminen/">(Kirjoittajan ABC)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography sx={{ pr: 0.5 }} display='inline'>
            Lue lisää motivaatiosta ja tavoitteiden asettamisesta:
          <Link href='https://gradutakuu.fi/sisallys/'>(Gradutakuu)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography sx={{ pr: 0.5 }} display='inline'>
            Lue lisää akateemisista tekstitaidoista:
          <Link href ='https://kokonaisvaltainenkirjoittaminen.fi/2011/02/15/akateemisen-kirjoittamisen-opetus/'>(Kokonaisvaltainen kirjoittaminen -blogi)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography sx={{ pr: 0.5 }} display='inline'>
            Lue tieteellisen referoimisesta (luku 6) e-kirjasta Tiede ja teksti - Tehoa ja taitoa tutkielman kirjoittamiseen
            (lainattavissa Haka-tunnuksilla ja kirjastoista):
          <Link href='https://www.ellibslibrary.com/book/9789523455115'>https://www.ellibslibrary.com/book/9789523455115</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography sx={{ pr: 0.5 }} display='inline'>
            Lue lisää palautteesta:
          <Link href = 'http://www.plotti.fi/2020/08/14/palautetta-hopeatarjottimella-vaikuta-palautekokemuksiisi/'>(Plotti)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Lue kirjoittamisen sosiaalisesta luonteesta:
          <Link href='https://antroblogi.fi/2017/06/sinun-tekstisi-ei-ole-sinun/'>(Sinun tekstisi ei ole sinun)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Lue tieteellisen tekstin rakenteesta ja argumentoinnista (luvut 4 ja 5) e-kirjasta Tiede ja teksti
            - Tehoa ja taitoa tutkielman kirjoittamiseen (lainattavissa Haka-tunnuksilla ja kirjastoista):
          <Link href='https://www.ellibslibrary.com/book/9789523455115'>https://www.ellibslibrary.com/book/9789523455115</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Tukea tekstin viimeistelyyn:
          <Link href='https://blogs.helsinki.fi/kielijelppi/viimeistely/'>(Kielijelppi)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Kangertaako kandityö?:
          <Link href='http://www.plotti.fi/2018/01/29/kangertaako-kandityo/'>(Plotti)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Miten vähentää prokrastinaatiota?:
          <Link href='https://www.nyyti.fi/opiskelijoille/opi-elamantaitoa/ajanhallinta/prokrastinaatio/miten-vahentaa-prokrastinaatiota/'>(Nyyti ry)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Kokeile vapaan kirjoittamisen tekniikoita:
          <Link href='https://blogs.helsinki.fi/kielijelppi/ideointivaihe/'>(Kielijelppi)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
            Jos sinua mietityttää esim. lukivaikeuteen tai mielen hyvinvointiin liittyvät asiat, saat lisätietoa korkeakoulusi verkkosivuilta
          <Link href='https://studies.helsinki.fi/ohjeet/artikkeli/opiskelun-tueksi'>(HY)</Link>
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          <Link href='http://www.kielitoimistonohjepankki.fi/'>Kielitoimiston ohjepankki</Link>
        </Typography>
      </ListItem>
    </List>
  </Box>
)

export default Links