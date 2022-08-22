import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/landing/LandingPage'
import SignUp from '../components/landing/Signup'
import Login from '../components/landing/Login'
import ProfileController from '../components/Controllers/ProfileController'
import SettingsController from '../components/Controllers/SettingsController'
import PostController from '../components/Controllers/PostController'
import Page404Controller from './Controllers/Page404Controller'
import HomePageController from './Controllers/HomeController.jsx'
import PostSharingPageHandler from './Controllers/PostSharingHandler'
import SearchController from '../components/Controllers/SearchController'
import NewSignUp from '../components/landing/NewSignUp'
import ChangePass from '../components/landing/ChangePass'
import MobileAchieved from '../components/dashboard/MobileNewGoals'
import MobileNearDeadline from './dashboard/MobileNearDeadline'


const RouterSwitch = () => {

    return (
    <BrowserRouter>
        <Routes>
            ```public routes```
            <Route exact path='/' element={ <LandingPage /> } />
            <Route exact path='/signup' element={ <SignUp />} />
            <Route exact path='/new-sign-up/:userId' element={ <NewSignUp />}/>
            <Route exact path='/login/*' element={ <Login />} />
            <Route exact path='/reset-password' element={ <ChangePass />}/>
            <Route exact path='*' element={ <Page404Controller />} /> 
            <Route path='/posts/shared/:postId' element={ <PostSharingPageHandler />}/>
            ```private routes: A controller will take care of these routes```
            <Route path='/home' element={ <HomePageController /> } />
            <Route path='/mobile/home/achieved' element={ <MobileAchieved /> } />
            <Route path='/mobile/home/near-deadline' element={ <MobileNearDeadline /> } />
            <Route path='/posts/:postId' element={ <PostController />}/>
            <Route path='/search/:query' element={ <SearchController />}/>
            <Route path='/profiles/:userId' element={ <ProfileController />}/>
            <Route path='/settings' element={ <SettingsController />}/>
            <Route path='/reset-password/:userId' element={ <ChangePass />}/>
        </Routes>
    </BrowserRouter>)
}
  
export default RouterSwitch