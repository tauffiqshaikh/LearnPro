import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import TopNav from '../components/TopNav';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const MyApp = ({Component, pageProps}) => {
    return <div>
        <ToastContainer position='top-center'/>
        <TopNav/>
        <Component {...pageProps} />
    </div>
}

export default MyApp;