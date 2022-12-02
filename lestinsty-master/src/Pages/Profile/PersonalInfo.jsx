import React, { useEffect, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { storage, storageRef } from '../../Config/FirebaseConfig'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import { database } from '../../Config/FirebaseConfig'
import { update, ref } from 'firebase/database'
import ActionAlerts from '../../Component/Alert/Alert'
import { setCurrentUserData } from '../../globalState/authSlice'
import Loader from '../../Component/Loader/Loader'
import { useNavigate } from 'react-router-dom'

let userInput = {
  name: '',
  number: '',
}
const PersonalInfo = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [user, setUser] = useState({})
  let [loading, setLoading] = useState(false)
  let [userInfo, setUserInfo] = useState(userInput)
  let [showAlert, setAlert] = useState({ status: '', message: '', show: false })
  const userData = useSelector((state) => {
    return state.authReducer
  })

  useEffect(() => {
    setUser(userData.user)
    if (userData.user?.name) {
      setUserInfo(userData.user)
    }
  }, [userData])

  //   image upload working
  const [imgUrl, setImgurl] = useState(null)
  const [imgName, setImgName] = useState('')
  const [local, setLocal] = useState('')

  //  upload img function
  const handleProfile = (event) => {
    const url = URL.createObjectURL(event.target.files[0])
    const goalImgName = event.target.files[0].name
    setImgurl(url)
    setImgName(goalImgName)
    setLocal(event.target.files[0])
    // console.log(url)
  }
  const handleCancel = () => {
    setImgurl(null)
    setImgName('')
    setLocal('')
  }
  //  upload image function
  const handleUploadProfile = () => {
    setLoading(true)
    let createStorageRef = storageRef(`profile/${imgName}`)
    // let download =  getDownloadURL(createStorageRef)
    // upload image in storage
    uploadBytes(createStorageRef, local)
      .then((res) => {
        // download image from storage
        getDownloadURL(storageRef(`profile/${imgName}`))
          .then((url) => {
            setImgurl(url)
            // update image in db
            update(ref(database, `users/${user.userId}`), {
              photo: url,
            })
              .then((result) => {
                setAlert({
                  status: 'success',
                  message: 'Successfully uploaded profile image!',
                  show: true,
                })
                handleCloseAlertTimeOut()

                setLoading(false)
                setImgurl(null)
                setImgName('')
                setLocal('')
              })
              .catch((err) => {
                setLoading(false)
                // console.log('getting error to upload url in db')
                setAlert({
                  status: 'error',
                  message: 'getting error to upload url in database!',
                  show: true,
                })
                handleCloseAlertTimeOut()
              })
          })
          .catch((err) => {
            setLoading(false)
            setAlert({
              status: 'error',
              message: 'Getting error to download url!',
              show: true,
            })
            handleCloseAlertTimeOut()

            // console.log('getting error to download')
          })
      })
      .catch((err) => {
        setLoading(false)
        setAlert({
          status: 'error',
          message: 'Getting error to upload image!',
          show: true,
        })
        handleCloseAlertTimeOut()

        console.log('getting error to upload')
      })
  }
  const handleCloseAlert = () => {
    setAlert({ show: false })
  }

  // edit info working
  let [isEdit, setEdit] = useState(false)
  const handleEdit = () => {
    setEdit(true)
  }

  const cancelEdit = () => {
    setEdit(false)
  }
  const handleInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleUpdateUserInfo = () => {
    // console.log(userInfo)
    setLoading(true)
    // navigate('/user')
    update(ref(database, `users/${user.userId}`), userInfo)
      .then(() => {
        setLoading(false)
        setEdit(false)
        // dispatch(setCurrentUserData(userInfo))
        setAlert({
          status: 'success',
          message: 'Your Info Successfully Updated!',
          show: true,
        })
        handleCloseAlertTimeOut()
      })
      .catch(() => {
        setLoading(false)

        setAlert({
          status: 'error',
          message: 'Something went wrong!',
          show: true,
        })
        handleCloseAlertTimeOut()
      })
  }

  const handleCloseAlertTimeOut = () => {
    setTimeout(() => {
      setAlert({ show: false })
    }, 1500)
  }
  //   console.log(imgUrl)

  return (
    <div className="prInfoContainer">
      {loading ? <Loader /> : null}
      {showAlert.show ? (
        <ActionAlerts
          onClick={handleCloseAlert}
          status={showAlert.status}
          message={showAlert.message}
        />
      ) : null}
      <div className="prInfoSection">
        <div className="prInfoCOntent">
          <div className="prInfoBox">
            <h3 className="mL10 txtLeft">Personal Information</h3>
            {!isEdit ? (
              <div className="linkBtn mT10">
                <Button color="error" variant="contained" onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            ) : null}
            <div className="userImg mT10">
              <img
                src={
                  imgUrl
                    ? imgUrl
                    : user?.photo
                    ? user.photo
                    : 'https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png'
                }
                alt=""
              />
              <label htmlFor="photo" className="iconBtn">
                <input
                  type="file"
                  style={{ display: 'none' }}
                  name="photo"
                  id="photo"
                  onChange={handleProfile}
                />
                <AddAPhotoIcon />
              </label>
            </div>
            {imgUrl ? (
              <div className="upldBtns">
                <Button
                  onClick={handleCancel}
                  size="large"
                  color="error"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  size="large"
                  disabled={loading}
                  onClick={handleUploadProfile}
                  variant="contained"
                >
                  {loading ? 'Loading...' : 'Upload'}
                </Button>
              </div>
            ) : null}
            <p className="prName colorRed">{user?.role}</p>
            <ul className="prInfoList">
              <li className="hfWdLi">
                <div className="hfWdInfo">
                  <p>Full Name :</p>
                  <input
                    className={isEdit ? 'userInp' : 'userInp disabledInp'}
                    type="text"
                    name="name"
                    id="name"
                    readOnly={!isEdit ? true : false}
                    defaultValue={user?.name}
                    onChange={handleInfoChange}
                    value={userInfo.name}
                  />
                </div>
                {/* </li> */}
                <div className="hfWdInfo">
                  {/* <li> */}
                  <p>Phone Number :</p>
                  <input
                    className={isEdit ? 'userInp' : 'userInp disabledInp'}
                    type="number"
                    name="number"
                    id="number"
                    onChange={handleInfoChange}
                    value={userInfo.number}
                    readOnly={!isEdit ? true : false}
                    defaultValue={user?.number}
                  />
                </div>
              </li>
              <li>
                <p>Email Address : </p>
                <input
                  className="userInp disabledInp"
                  type="email"
                  name="email"
                  id="email"
                  readOnly
                  defaultValue={user?.email}
                />
              </li>
            </ul>
            {isEdit ? (
              <div className="upldBtns">
                <Button
                  size="large"
                  onClick={cancelEdit}
                  color="error"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  size="large"
                  disabled={loading}
                  onClick={handleUpdateUserInfo}
                  variant="contained"
                >
                  {loading ? 'Loading...' : 'Update'}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
