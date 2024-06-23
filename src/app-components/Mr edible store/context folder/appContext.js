import React, { createContext, useEffect,} from 'react'
import { useState } from 'react'
import { Link, NavLink, Navigate, } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
// import users from '../../signup/usersData'
import { child, get, getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { getDownloadURL,ref as refStorage, getStorage, deleteObject } from 'firebase/storage';
import { deleteUser, getAuth } from 'firebase/auth';
import "./appcontext.css"
import { storeName } from '../../component/vendor-component/vendor-card';

export let productsIDInTheCartList=[]
let changes=false
export const Cartcontext= createContext({
  signinsuccessful:false,
  
  numberOfItemsInCart:0,
  currentUser: 0,
  loginIcon:0,
  casechange:changes,
  changeINdex:0,
  totalItemInCart:0,
  items:productsIDInTheCartList,
  orders:0,
  authdata:0,
  buissnessName:0,
  getproductquantity:()=>{},
  increaseProductQuantity:()=>{},
  addItemsToCartList:()=>{},
  decreaseProductQuantity:()=>{}, 
  deleteFromCartList:()=>{},
  getTotalCart:()=>{},
  changeZ:()=>{},
  switchToUser:()=>{},
  signout:()=>{},
  deleteUserAccount:()=>{},
  addToOrders:()=>{},
  changeAuthUser:()=>{},
  forwardDetails:()=>{}
})


function Cartprovider({children}) {
  let regID=null
  let [imageUrl, setimageUrl]= useState("")
  if (localStorage.getItem("mredible_cart") !==null){
    let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
    Object.keys(allfoods).forEach((item)=>{
      if (item===localStorage.getItem("nameobject")){
        productsIDInTheCartList=allfoods[item]
      }
    })
  }
  const [numberOfItemsInCart, setnumberOfItemsInCart]=useState(productsIDInTheCartList.length)
  const [indexState, setindexState]=useState({ zIndex:"2" })
  function changeZ(){
    changes=!changes
    changes? setindexState({ zIndex:"0" }):setindexState({zIndex:"2"})
  }

  

  const [totalCart, settotalCart]=useState(0)

  function getproductquantity(id){
    const quantity=productsIDInTheCartList.find(product=> product.id===id)?.quantity
    if(quantity===undefined){
      return 0;
    }
    return quantity
  }

  function addItemsToCartList(id, price, name, image, vendorName){
    const quantity=getproductquantity(id)
    if (quantity===0){
        // productsIDInTheCartList=[{id:id, price:price, name:name, image:image, vendorName:vendorName, quantity:1}, ...productsIDInTheCartList ]
        if (localStorage.getItem("mredible_cart") !==null){
          let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
          Object.keys(allfoods).forEach((item)=>{
            if (item===localStorage.getItem("nameobject")){
              allfoods[item]=[{id:id, price:price, name:name, image:image, vendorName:vendorName, quantity:1}, ...allfoods[item] ]
              console.log(allfoods[item])
              localStorage.setItem("mredible_cart", JSON.stringify(allfoods))
            }else{
              allfoods[localStorage.getItem("nameobject")] = [{id:id, price:price, name:name, image:image, vendorName:vendorName, quantity:1} ];
              localStorage.setItem("mredible_cart", JSON.stringify(allfoods))
            }
          })
        }
        else {
          localStorage.setItem("mredible_cart", JSON.stringify({[localStorage.getItem("nameobject")]:[{id:id, price:price, name:name, image:image, vendorName:vendorName, quantity:1}]}))
        }
      }else{console.log("item already exist in cart")}

    getTotalCart() 
    // localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
    if (localStorage.getItem("mredible_cart")!==null){
      let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
      let cartlength=0
      Object.keys(allfoods).forEach((item)=>{
        if (item===localStorage.getItem("nameobject")){
          cartlength=allfoods[item].length
          setnumberOfItemsInCart(cartlength)
        }
      })
      // setnumberOfItemsInCart(JSON.parse(localStorage.getItem("mredible_cart")).length)
    }
    // else{
    //   setnumberOfItemsInCart(0)
    // }
  }

  function deleteFromCartList(id){
    if (localStorage.getItem("mredible_cart") !==null){
      let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
      Object.keys(allfoods).forEach((item)=>{
        if (item===localStorage.getItem("nameobject")){
          let matchingproduct=allfoods[item].filter((product)=>{
            return product.id!==id
          })
          allfoods[item]=matchingproduct
          console.log(allfoods[item])
          localStorage.setItem("mredible_cart", JSON.stringify(allfoods))
          allfoods[item].length<1?settotalCart(0):getTotalCart()
        }
      })
    }
    
    // productsIDInTheCartList.length<1?settotalCart(0):getTotalCart()
    // localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
    if (localStorage.getItem("mredible_cart")!==null){
      let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
      let cartlength=0
      Object.keys(allfoods).forEach((item)=>{
        if (item===localStorage.getItem("nameobject")){
          cartlength=allfoods[item].length
          setnumberOfItemsInCart(cartlength)
        }
      })
    }
    else{
      setnumberOfItemsInCart(0)
    }
  }

  function increaseProductQuantity(id, price, name, image){
    if (localStorage.getItem("mredible_cart") !==null){
      let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
      Object.keys(allfoods).forEach((item)=>{
        if (item===localStorage.getItem("nameobject")){
          allfoods[item]=allfoods[item].map(product=>{
            if (product.id === id){
             return {...product, quantity:product.quantity+1}
            }else {return product}
          }) 
          localStorage.setItem("mredible_cart", JSON.stringify(allfoods))
        }
      })
    }
    
    // console.log(productsIDInTheCartList)
    getTotalCart()
    // localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
}

  function decreaseProductQuantity(id){

    if (localStorage.getItem("mredible_cart") !==null){
      let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
      Object.keys(allfoods).forEach((item)=>{
        if (item===localStorage.getItem("nameobject")){
          if (allfoods[item].length<=1){
            deleteFromCartList(id)
          }else{
            allfoods[item]=allfoods[item].map((product)=>{
              if(product.id===id){
                product.quantity--
                return product
              }
              else{return product}
            })
          }
          
          localStorage.setItem("mredible_cart", JSON.stringify(allfoods))
        }
      })
    }
    getTotalCart()
    
  }
  
  function getTotalCart(){
    if (localStorage.getItem("mredible_cart") !==null){
      let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
      Object.keys(allfoods).forEach((item)=>{
        if (item===localStorage.getItem("nameobject")){
          settotalCart(allfoods[item].reduce((total, product)=>{
            return total+(product.price*product.quantity)
          },0)
          )
        }
      })
    }
  }

  // let userOrders=[]
  function package_recieved(){

    update(ref(getDatabase(), "users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id+"/order_history/"+"--NoQUEJZrqrRgijJr28B"), {delivery_pending:false})
  }
  
  
  let [itemsInOrders, setitemsInOrders]=useState(JSON.parse(localStorage.getItem('mredibleloggedinUser'))&& JSON.parse(localStorage.getItem('mredibleloggedinUser')).order_history ? Object.values(JSON.parse(localStorage.getItem('mredibleloggedinUser')).order_history).map((item, index)=>{
    // function package_recieved(){
    //   update(ref(getDatabase(), "users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id+"/order_history"+"/"+item), {delivery_pending:false})
    // }  
    return (
              <div key={index} className="ordered-food-item"  >
              <img src={item.image} alt="rice"/>
              <p className="ordered-food-name">{item.vendorName}</p>
              <p className="ordered-food-name">{item.name}</p>
              <p className="ordered-food-price">₦{item.price}</p>
              <p className="ordered-food-name">{item.date}</p>
              {item.delivery_pending? <button onClick={package_recieved()}>i have Recieved package</button>:<p>transaction successfull!</p>}
              </div>
            )
      })  : "Empty")     

  async function addToOrders(){
    const userCartItems= productsIDInTheCartList.map(item=>{
      return {...item,   date:new Date().toLocaleString()}
    })
    let loggedinuser=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
    userCartItems.map(item=>{
      const newPostKey = push(child(ref(getDatabase()), "users/"+ loggedinuser.id+"/order_history" ));
      // item.id:newPostKey;
      const newPostKeys = push(ref(getDatabase()), 'posts').key;
      const postdata={...item, ids:newPostKeys, delivery_pending:true}
      console.log(postdata)
      set(newPostKey, postdata)
    })
  
    if (localStorage.getItem("mredibleloggedinUser")!==null){
      let loggedinuser=JSON.parse(localStorage.getItem('mredibleloggedinUser')).order_history
      
      if (loggedinuser){
          setitemsInOrders(
            Object.values(loggedinuser).map((item, index)=>{
              // function package_recieved(){
              //   update(ref(getDatabase(), "users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id+"/order_history/"+item), {delivery_pending:false})
              // }
              return (
                <div key={index} className="ordered-food-item"  >
                <img src={item.image} alt="rice"/>
                <p className="ordered-food-name">{item.vendorName}</p>
                <p className="ordered-food-name">{item.name}</p>
                <p className="ordered-food-price">₦{item.price}</p>
                <p className="ordered-food-name">{item.date}</p>
                {item.delivery_pending? <button onClick={package_recieved(item.ids)}>i have Recieved package</button>:<p>transaction successfull!</p>}
                </div>
              )
            })
          )
        }
      }
  }
  let companyName= "mredible"
  function forwardDetails(name, image){
    localStorage.setItem("nameobject", name)
    
  } 
  useEffect(()=>{
    if (localStorage.getItem("mredible_cart")!==null){
      productsIDInTheCartList=JSON.parse(localStorage.getItem("mredible_cart"))
    }
    if (localStorage.getItem("mredibleloggedinUser")!==null){
      let loggedinuser=JSON.parse(localStorage.getItem('mredibleloggedinUser')).order_history
      
      if (loggedinuser){
        setitemsInOrders(
          Object.values(loggedinuser).map((item, index)=>{
            return (
              <div key={index} className="ordered-food-item"  >
              <img src={item.image} alt="rice"/>
              <p className="ordered-food-name">{item.vendorName}</p>
              <p className="ordered-food-name">{item.name}</p>
              <p className="ordered-food-price">₦{item.price}</p>
              <p className="ordered-food-name">{item.date}</p>
              {item.delivery_pending? <button onClick={package_recieved(item.ids)}>i have Recieved package</button>:<p>transaction successfull!</p>}
              </div>
            )
          })
        )
      }
      else{
        setitemsInOrders(
          "empty"
        )
      }
      
    }
},[])
  
  const [loginIcon, setloginIcon]= useState(
    <div className="login-container">
      <div><FaUserCircle /></div>
      <NavLink to="/login-page">
      <p>SIGN IN</p>
      </NavLink>
    </div>)

  if (localStorage.getItem('mredibleloggedinUser') !== null){
    const dataRef =ref(getDatabase(), "users/"+`${JSON.parse(localStorage.getItem('mredibleloggedinUser')).id}`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();;
      localStorage.setItem('mredibleloggedinUser', JSON.stringify({...data}))
    });
  }
  let [userloggedin, setuserloggedin]=useState({})
  
  function storeuserid(id){
    regID=id
  }
  let databasePath=null
  let storagePath=null
  let [authUser, setauthUser]=useState(null)
  function changeAuthUser(){
    setauthUser(null)
  }

  async function switchToUser(userid, loginID,){
    if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"||JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"||JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"){
    const storage = getStorage();
          let picUrl=''  
    if (loginID===1){
      setauthUser("customer")
      await getDownloadURL(refStorage(storage, `${JSON.parse(localStorage.getItem('mredibleloggedinUser')).passport}`))
      .then((url) => {
        picUrl=url 
      })
      .catch((error)=>{
        console.log(error)
        picUrl="https://robohash.org/fghj"
      })
    }
    else if (loginID===2){
      setauthUser("vendor")
      await getDownloadURL(refStorage(storage, `${JSON.parse(localStorage.getItem('mredibleloggedinUser')).passport}`))
      .then((url) => {
        picUrl=url 
      })
      .catch((error)=>{
        console.log(error)
        picUrl="https://robohash.org/fghj"
      })
    }
    
    // loginID===1&&setauthUser("customer")
    // loginID===2&&setauthUser("vendor")
    loginID===3&&setauthUser("admin")
        let fullnameAb=JSON.parse(localStorage.getItem('mredibleloggedinUser')).name.split('')
        fullnameAb.map((item, index)=>{
              if (item===' '){
                if(fullnameAb[index+1]){
                  fullnameAb=`${fullnameAb[0]}. ${fullnameAb[index+1]}`.toLocaleUpperCase()
                  console.log(fullnameAb)
                }
              }else if (!fullnameAb.includes(" ")){
                fullnameAb= (fullnameAb[0]+fullnameAb[2]).toLocaleUpperCase()
              }
          })

          setloginIcon(
            <div className="loggedin-user-container">
            <img src={picUrl} width="20px" height="20px" alt='user pic'/>
            <NavLink to={JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"?"/user-profile":JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"?"/Vendor-profile-Overview":JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"&&"admin-page"}>{fullnameAb}</NavLink>
          </div>)
          // setauthUser(null)
    }else{
      // localStorage.removeItem('mredibleloggedinUser')
      // const user= getAuth().currentUser;
      // // const user= auth.currentUser
      // await user?.delete();
      alert("please signup")
    }
  }

  function signout(){
    setuserloggedin({})
    setloginIcon(
      <div className="login-container">
        <div><FaUserCircle /></div>
        <NavLink to="/login-page">SIGN IN</NavLink>
      </div>)
  }

  
  useEffect(() => {
    // useffect calls a keepuserloggedin() function to keep use signed in when the browser reloads
    keepuserloggedin()
 }, []);

 async function keepuserloggedin(){
  let fullnameAb=null
  
  if (localStorage.getItem('mredibleloggedinUser') !== null){
    if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"||JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"||JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"){
    fullnameAb=JSON.parse(localStorage.getItem('mredibleloggedinUser')).name.split('')
    fullnameAb.map((item, index)=>{
          if (item===' '){
            if(fullnameAb[index+1]){
              fullnameAb=`${fullnameAb[0]} .${fullnameAb[index+1]}`.toLocaleUpperCase()
              console.log(fullnameAb)
            }
          }else if (!fullnameAb.includes(" ")){
            fullnameAb= (fullnameAb[0]+fullnameAb[2]).toLocaleUpperCase()
          }
      })
      const storage = getStorage();
      let picUrl=''  
        if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"){
          await getDownloadURL(refStorage(storage, `${JSON.parse(localStorage.getItem('mredibleloggedinUser')).passport}`))
          .then((url) => {
            picUrl=url 
          })
          .catch((error)=>{
            console.log(error)
            picUrl="https://robohash.org/fghj"
          })
        }else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"){
          await getDownloadURL(refStorage(storage, `${JSON.parse(localStorage.getItem('mredibleloggedinUser')).passport}`))
          .then((url) => {
            picUrl=url 
          })
          .catch((error)=>{
            console.log(error)
            picUrl="https://robohash.org/fghj"
          })
        }else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"){
          await getDownloadURL(refStorage(storage, `${JSON.parse(localStorage.getItem('mredibleloggedinUser')).passport}`))
          .then((url) => {
            picUrl=url 
          })
          .catch((error)=>{
            console.log(error)
            picUrl="https://robohash.org/fghj"
          })
        }

          setloginIcon(
            <div className="loggedin-user-container">
            <img src={picUrl} width="20px" height="20px" alt='user pic'/>
            <NavLink to={JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"?"/user-profile":JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"?"Vendor-profile-Overview":JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"&&"admin-page"}>{fullnameAb}</NavLink>
          </div>)
          }else{
            // localStorage.removeItem('mredibleloggedinUser')
            // const user= getAuth().currentUser;
            // await user?.delete()
            alert("please signup")
          }
  }

}

  function deleteUserAccount(index){
    const auth = getAuth();
      const user = auth.currentUser;

      deleteUser(user).then(() => {
        // User deleted.
        const storage = getStorage();
        const desertRef = refStorage(storage,`customer passport/ ${index}`);
        deleteObject(desertRef).then(() => {
          // File deleted successfully
          setuserloggedin({})
          if (localStorage.getItem('mredibleloggedinUser') !== null){
            localStorage.removeItem('mredibleloggedinUser')
          }
        }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        });
        
        remove(ref(getDatabase(),"users/"+index))
        if (localStorage.getItem('mredibleloggedinUser') !== null){
          localStorage.removeItem('mredibleloggedinUser')
        }
        setloginIcon(
          <div className="login-container">
            <div><FaUserCircle /></div>
            <NavLink to="/login-page">
            <p>SIGN IN</p>
            </NavLink>
          </div>)
      }).catch((error) => {
        // An error ocurred
        // ...
        alert ("An error occured account was not deleted")
      });
  }

  const contextvalue={
    signinsuccessful:false,
    numberOfItemsInCart:numberOfItemsInCart,
    currentUser: userloggedin,
    loginIcon:loginIcon,
    casechange:changes,
    changeINdex:indexState,
    increaseIndex:true,
    items:productsIDInTheCartList,
    totalItemInCart:totalCart,
    orders:itemsInOrders,
    authdata:authUser,
    buissnessName:companyName,
    getproductquantity,
    increaseProductQuantity,
    addItemsToCartList,
    decreaseProductQuantity,
    deleteFromCartList,
    getTotalCart,
    changeZ,
    switchToUser,
    signout,
    deleteUserAccount,
    addToOrders,
    changeAuthUser,
    forwardDetails,
  }

  return (
    <Cartcontext.Provider value={contextvalue}>
      {children}
    </Cartcontext.Provider>
  )
}

export default Cartprovider