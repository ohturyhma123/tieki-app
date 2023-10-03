import { useNavigate } from 'react-router-dom'
import HomeButton from '../components/Button'

const Links = () => {
  const navigate = useNavigate()
  const homeRoute = () => { navigate('/home') }

  return (
    <div>
      <HomeButton onClick={homeRoute} />
      <h1>Hyödyllisiä linkkejä</h1>
      <p>
      Lue lisää yhdessä kirjoittamisesta:
        <a href="https://webcgi.oulu.fi/oykk/abc/kirjoittamisprosessi/yhdessa_kirjoittaminen_ja_yhteiskirjoittaminen/">(Kirjoittajan ABC)</a> <br />
       Lue lisää motivaatiosta ja tavoitteiden asettamisesta: <a href='https://gradutakuu.fi/sisallys/'>(Gradutakuu)</a>  <br />
       Lue lisää akateemisista tekstitaidoista:
        <a href ='https://kokonaisvaltainenkirjoittaminen.fi/2011/02/15/akateemisen-kirjoittamisen-opetus/'>(Kokonaisvaltainen kirjoittaminen -blogi)</a>  <br />
       Lue tieteellisen referoimisesta (luku 6) e-kirjasta Tiede ja teksti - Tehoa ja taitoa tutkielman kirjoittamiseen
       (lainattavissa Haka-tunnuksilla ja kirjastoista): https://www.ellibslibrary.com/book/9789523455115 <br />
       Lue lisää palautteesta:
        <a href = 'http://www.plotti.fi/2020/08/14/palautetta-hopeatarjottimella-vaikuta-palautekokemuksiisi/'> (Plotti)</a> <br />
       Lue kirjoittamisen sosiaalisesta luonteesta: <a href='https://antroblogi.fi/2017/06/sinun-tekstisi-ei-ole-sinun/'>(Sinun tekstisi ei ole sinun)</a> <br />
       Lue tieteellisen tekstin rakenteesta ja argumentoinnista (luvut 4 ja 5) e-kirjasta Tiede ja teksti - Tehoa ja taitoa tutkielman kirjoittamiseen
       (lainattavissa Haka-tunnuksilla ja kirjastoista): https://www.ellibslibrary.com/book/9789523455115 <br />
        <a href='http://www.kielitoimistonohjepankki.fi/'>Kielitoimiston ohjepankki </a> <br />
       Tukea tekstin viimeistelyyn: <a href='https://blogs.helsinki.fi/kielijelppi/viimeistely/'>(Kielijelppi)</a> <br />
       Kangertaako kandityö?: <a href='http://www.plotti.fi/2018/01/29/kangertaako-kandityo/'>(Plotti)</a> <br />
       Miten vähentää prokrastinaatiota?:
        <a href='https://www.nyyti.fi/opiskelijoille/opi-elamantaitoa/ajanhallinta/prokrastinaatio/miten-vahentaa-prokrastinaatiota/'>(Nyyti ry)</a> <br />
       Kokeile vapaan kirjoittamisen tekniikoita: <a href='https://blogs.helsinki.fi/kielijelppi/ideointivaihe/'>(Kielijelppi)</a> <br />
       Jos sinua mietityttää esim. lukivaikeuteen tai mielen hyvinvointiin liittyvät asiat, saat lisätietoa korkeakoulusi verkkosivuilta
        <a href='https://studies.helsinki.fi/ohjeet/artikkeli/opiskelun-tueksi'>(HY)</a> <br />
      </p>
    </div>
  )
}

export default Links