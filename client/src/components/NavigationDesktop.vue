<template>
  <header class="p-shadow-4">
   <nav>
       <ul class="dropdown-nav ">
          <li @click="toggleMobileNav"><router-link :to="{ name: 'Home' }" class="link">Home</router-link></li>
          <li @click="toggleMobileNav"><router-link :to="{ name: 'Shitcans' }" class="link">Shitcans</router-link></li>
       </ul>
   </nav>
  </header>
</template>

<script>
export default {
  name: "NavigationDesktop",
  

}


</script>

<style lang="scss" scoped>

header {
  width: 0%;
  position: fixed;
  left: 0;
  transition: .3s ease all;
  padding: 10px;
  nav {
    display: flex;
    align-items: left;
    justify-content: left;
    padding: 15px 0;
    transition: .2s ease all;
    width: 100%;
    margin: 0 !important;
    
    @media (min-width: 768px) {
        padding: 8px;
      }


    .ul,
    .link {
      font-weight: 500;
      list-style: none;
      text-decoration: none;
      text-shadow: 2px 2px 4px #0000005d;
    }
    ul {
          padding-inline-start: 0 !important;
    }

    li {
      text-transform: uppercase;
      padding: 8px;
      list-style-type: none;
    }

    .link {
      font-size: 30px;
      transition: .4s ease all;
      padding: 7px;
      border: 2px solid transparent;

      &:hover {
        border-color: rgb(0, 253, 110);
      }
    }
    
    .branding {
      display: flex;
      align-items: center;

      img {
        width: 60px;
        transition: .5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      text-align: center;

    }
    .m-nav {
      padding: 20px;
    }
    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      transition: .2s;
      
      i {
        cursor: pointer;
        font-size: 24px;
        transition: .4s ease all;
      }
    }

    .icon-active {
      transform: rotate(270deg);
      
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      max-width: 150px;
      height: 100%;
      padding: 20px 0px !important;
      bottom:0;
      left:0;
      margin-left: 0;


      li {
        margin-right: 0;
        
      }
      .link {
      font-size: 20px;
      text-shadow: .5px .5px 2px #87898d57;
      
      

      &:hover {
        border-radius: 5px;
        padding: 5px;
        border-color: rgb(0, 253, 110);
      }
    }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from, 
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}

.scrolled-nav {
  //background-color: rgb(0, 238, 255);
  background-image: linear-gradient(rgb(255, 241, 173), rgb(187, 176, 122));
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 10px;

  nav {
    padding: 12px 0;
    @media (min-width: 768px) {
        padding: 2px;
      }
    

    .branding {
      img {
        filter: invert(100%);
        width: 50px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 2px 4px -1px rgba(0, 0, 0, 0.06);

      }
    }
    .link {
      font-weight: 500;
      color: rgb(0, 0, 0);
      list-style: none;
      text-decoration: none;
      text-shadow: 1px 1px 2px #0000007e;
      font-size: 20px;
      &:hover {
        border-color: #000000;
        color: #00ff40;
      }
    }
    
    .icon {
      color: rgb(77, 255, 0);

    }
  }
}



</style>
