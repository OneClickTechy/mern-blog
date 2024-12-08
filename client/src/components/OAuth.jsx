import { Alert, Button } from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useGoogleAuthMutation } from '../app/service/authApiSlice'
import { Navigate } from 'react-router-dom'

export default function OAuth() {
    const auth= getAuth(app);
    const [googleAuth, {isSuccess, isError, error}] = useGoogleAuthMutation();
    const handleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const userInfo = {
                name:resultFromGoogle.user.displayName,
                email:resultFromGoogle.user.email,
                photoURL: resultFromGoogle.user.photoURL,
            }
            await googleAuth(userInfo);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with google</Button>
        {isError && <Alert color='failure'>{error.message}</Alert>}
        {isSuccess && (
        <>
        <Alert color='success'>Authentication successful</Alert>
        <Navigate to="/"/>
        </>)
        }
        </>
  )
}
