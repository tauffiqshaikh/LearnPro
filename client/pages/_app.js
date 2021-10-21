import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import TopNav from '../components/TopNav';

const MyApp = ({Component, pageProps}) => {
    return <div>
        <TopNav/>
        <Component {...pageProps} />
    </div>
}

export default MyApp;