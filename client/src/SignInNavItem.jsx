import React from "react";

const SignInNavItem = () => {
  function handleSubmit(){
    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type='text'
          name='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};
