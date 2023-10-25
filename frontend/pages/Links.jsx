import { Box, Link, List, ListItem, Typography, Grid } from '@mui/material'

const Links = () => (
  <Grid sx={{ background: '#FEF6E1' }} container direction="column" justifyContent="center" alignItems="center">
    <Box sx={{ p: 5 }} >
      <Typography sx={{ pb: 3 }} variant='h3'>Hyödyllisiä linkkejä</Typography>
      <List>
        <ListItem>
          <Typography>
              Lue lisää yhdessä kirjoittamisesta:
            <Link sx={{ pl: 0.5 }} href="https://webcgi.oulu.fi/oykk/abc/kirjoittamisprosessi/yhdessa_kirjoittaminen_ja_yhteiskirjoittaminen/">Kirjoittajan ABC</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography id='testlink'>
              Lue lisää motivaatiosta ja tavoitteiden asettamisesta:
            <Link sx={{ pl: 0.5 }} href='https://gradutakuu.fi/sisallys/'>Gradutakuu</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue lisää akateemisista tekstitaidoista:
            <Link sx={{ pl: 0.5 }} href ='https://kokonaisvaltainenkirjoittaminen.fi/2011/02/15/akateemisen-kirjoittamisen-opetus/'>Kokonaisvaltainen kirjoittaminen -blogi</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue tieteellisen referoimisesta (luku 6) e-kirjasta Tiede ja teksti - Tehoa ja taitoa tutkielman kirjoittamiseen
              (lainattavissa Haka-tunnuksilla ja kirjastoista):
            <Link sx={{ pl: 0.5 }} href='https://www.ellibslibrary.com/book/9789523455115'>https://www.ellibslibrary.com/book/9789523455115</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue lisää palautteesta:
            <Link sx={{ pl: 0.5 }} href = 'http://www.plotti.fi/2020/08/14/palautetta-hopeatarjottimella-vaikuta-palautekokemuksiisi/'>Plotti</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue kirjoittamisen sosiaalisesta luonteesta:
            <Link sx={{ pl: 0.5 }} href='https://antroblogi.fi/2017/06/sinun-tekstisi-ei-ole-sinun/'>Sinun tekstisi ei ole sinun</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Lue tieteellisen tekstin rakenteesta ja argumentoinnista (luvut 4 ja 5) e-kirjasta Tiede ja teksti
              - Tehoa ja taitoa tutkielman kirjoittamiseen (lainattavissa Haka-tunnuksilla ja kirjastoista):
            <Link sx={{ pl: 0.5 }} href='https://www.ellibslibrary.com/book/9789523455115'>https://www.ellibslibrary.com/book/9789523455115</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Tukea tekstin viimeistelyyn:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/kielijelppi/viimeistely/'>Kielijelppi</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Kangertaako kandityö?:
            <Link sx={{ pl: 0.5 }} href='http://www.plotti.fi/2018/01/29/kangertaako-kandityo/'>Plotti</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Miten vähentää prokrastinaatiota?:
            <Link sx={{ pl: 0.5 }} href='https://www.nyyti.fi/opiskelijoille/opi-elamantaitoa/ajanhallinta/prokrastinaatio/miten-vahentaa-prokrastinaatiota/'>Nyyti ry</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Kokeile vapaan kirjoittamisen tekniikoita:
            <Link sx={{ pl: 0.5 }} href='https://blogs.helsinki.fi/kielijelppi/ideointivaihe/'>Kielijelppi</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
              Jos sinua mietityttää esim. lukivaikeuteen tai mielen hyvinvointiin liittyvät asiat, saat lisätietoa korkeakoulusi verkkosivuilta
            <Link sx={{ pl: 0.5 }} href='https://studies.helsinki.fi/ohjeet/artikkeli/opiskelun-tueksi'>HY</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link sx={{ pl: 0.5 }} href='http://www.kielitoimistonohjepankki.fi/'>Kielitoimiston ohjepankki</Link>
          </Typography>
        </ListItem>
      </List>
    </Box>
  </Grid>
)

export default Links