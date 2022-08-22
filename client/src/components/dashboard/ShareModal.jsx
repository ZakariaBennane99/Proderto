import React, { useEffect } from 'react'
import fb from '../../Design_Stuff/Dashboard/fb.svg'
import twt from '../../Design_Stuff/Dashboard/twit.svg'
import lin from '../../Design_Stuff/Dashboard/lnk.svg'
import what from '../../Design_Stuff/Dashboard/what.svg'


const ShareModal = ({ remove, update, postId }) => {

    const sharingURL = "https://proderto.com/posts/shared/" + postId  

    function handleShare (e) {
        // I stored it in an object for consistency
        const name = e.target.getAttribute("name")
        const ev = {
            currentTarget : {
                id: e.target.getAttribute("id")
            }
        }
        if (name === "fb") {
            window.FB.ui({
                method: 'feed',
                link: sharingURL
            }, function(response){
                if (Array.isArray(response)) {
                    if (update) {
                        update(ev)
                        return
                    }
                    window.location.reload()
                } else {
                    if (remove) {
                        remove(ev)
                        return
                    }
                    window.location.reload()
                }
            })
        } else if (name === "lin") {
            // you need to generate an URL that lets everyone access the shared post 
            // wihout login but they don't have access to the full post until they sign up 
            // make sure your created post have og tags, for more see:
            // https://stackoverflow.com/questions/57777616/how-to-make-a-custom-linkedin-share-button-using-post
            const url = `https://www.linkedin.com/sharing/share-offsite/?url=${sharingURL}`
            window.open(url, "_blank")
            if (update) {
                update(ev)
                return
            }
            window.location.reload()
        } else if (name === "twt") {
            // you need to generate an URL that lets everyone access the shared post 
            // wihout login but they don't have access to the full post until they sign up 
            // make sure your created post have og tags, for more see:
            // https://stackoverflow.com/questions/57777616/how-to-make-a-custom-linkedin-share-button-using-post
            const url = `https://twitter.com/intent/tweet?url=${sharingURL}`
            window.open(url, "_blank")
            if (update) {
                update(ev)
                return
            }
            window.location.reload()
        } else if (name === "wha") {
            // you need to generate an URL that lets everyone access the shared post 
            // wihout login but they don't have access to the full post until they sign up 
            // make sure your created post have og tags, for more see:
            // https://stackoverflow.com/questions/57777616/how-to-make-a-custom-linkedin-share-button-using-post
            const url = `https://api.whatsapp.com/send?url=${sharingURL}`
            window.open(url, "_blank")
            if (update) {
                update(ev)
                return
            }
            window.location.reload()
        }
    }

    useEffect(() => {
        // fb sdk
        window.fbAsyncInit = () => {
            window.FB.init({
                appId            : '2841748042801438',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v14.0'
            })
        }
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        // twitter sdk
        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = [];
            t.ready = function(f) {
              t._e.push(f);
            };
            return t;
          }(document, "script", "twitter-wjs"));
          window.twttr.ready(function(twttr) {       
            twttr.events.bind('tweet', (r) => {
                const ev = {
                    currentTarget : {
                        id: 'share'
                    }
                }
                if (r.type === "tweet") {
                    update(ev)
                } else {
                    remove(ev)
                }
            })
        })
    }, [])



    return (
        <>
            <div className='modal-background' id='share' onClick={remove}></div>
            <div className='share-modal'>
                <div onClick={handleShare} >
                    <img id='share' name="fb" src={fb} alt="facebook" style={{ width: "40px" }}/>
                </div>    
                <div  onClick={handleShare} >
                    <img id='share' name="twt" src={twt} alt="facebook" style={{ width: "40px" }}/>
                </div> 
                <div  onClick={handleShare} >
                    <img id='share' name="lin" src={lin} alt="linkedIn" style={{ width: "40px" }}/>
                </div>
                <div  onClick={handleShare} >
                    <img id='share' name="wha" src={what} alt="WhatsApp" style={{ width: "40px" }}/>
                </div>
            </div>
        </>
    )
}


export default ShareModal