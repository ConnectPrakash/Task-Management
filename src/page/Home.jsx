import {react} from 'react'
import Header from '../component/header.jsx';
import image1 from '../assets/pngwing.com (1).png'
import image2 from '../assets/pngwing.com (2).png'
import image3 from '../assets/pngwing.com (4).png'
import image4 from '../assets/pngwing.com (5).png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.png'
function Home(){
    return(
        <div>
       <Header props={"Home"}/>
       <div className='Home-container'>
       <div className='Home'>
          <div className='home-content'>
        <h2>Task Manager</h2>
        <h4>Simplify Your Workday with Smart Tak Management.</h4>
        <p>Plan ,Organize and execute tasks effortlessly with ur nttuitive todos set prioties,track progess and meet deadlines seamlessly</p>
         <button>Get Started</button>
          </div>
          <div className='home-img'>
            <img src={image1} alt='default'/>
          </div>
       </div>

       <div className='Home-User'>
        <div>
            <h2>+5,200</h2>
            <p>Happy Users</p>
        </div>
        <div>
            <h2>+4,500</h2>
            <p>Paid Users</p>
        </div>
        <div>
            <h2>+10,000</h2>
            <p>Viewers</p>
        </div>
        <div>
            <h2>+15,000</h2>
            <p>Total Tasks</p>
        </div>
       </div>

       <div className='Home-create-Task'>
        <div className='Home-create-Task-content1'>
            <h2>Create and Manage Tasks Effortlessly</h2>
            <p>Add tasks with just a few clicks,assign deadlines, set priorities and track progress in real time.</p>
        </div >
        <div className='Home-create-Task-img'>
            <img src={image2} alt='default-image'/>
        </div>
       </div>

       <div className='Home-create-Task'>
       <div className='Home-create-Task-img2'>
            <img src={image3} alt='default-image'/>
        </div>
        <div className='Home-create-Task-content'>
            <h2>Read and Stay on Top of Every Task</h2>
            <p>Quickly review task details, deadlines, and priorities in one oraganized view</p>
        </div >
       
       </div>
       <div className='Home-create-Task'>
        <div  className='Home-create-Task-content1'>
            <h2>Create and Manage Tasks Effortlessly</h2>
            <p>Add tasks with just a few clicks,assign deadlines, set priorities and track progress in real time.</p>
        </div >
        <div className='Home-create-Task-img2'>
            <img src={image4} alt='default-image'/>
        </div>
       </div>


       <div className='Home-create-Task'>
       <div className='Home-create-Task-img2'>
            <img src={image5} alt='default-image'/>
        </div>  
        <div  className='Home-create-Task-content'>
            <h2>Delete Tasks with Confidence</h2>
            <p>Easily remove Task you no longer need, keeping your workspace clutter-free.</p>
        </div >
      


       </div>

       <div className='Home-create-Task'>
        <div  className='Home-create-Task-content1'>
            <h2>Pin Tasks for Quick Access</h2>
            <p>Keep your most important tasks front and center by pinning them to the top.</p>
        </div >
        <div className='Home-create-Task-img2'>
            <img src={image6} alt='default-image'/>
        </div>
       </div>
       
       <div className='Home-customer-review'>
        <h1>Customer Review</h1>
        <div className='Home-customer'>
            <div>
                <p></p>
            </div>
        </div>
       </div>
       </div>
     
     
        </div>
    )
}

export default Home;