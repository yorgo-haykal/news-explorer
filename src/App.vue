<template>
  <header>
    <h1>News Explorer</h1>
    <button id="explore-button">Explore</button>
  </header>
  <router-view />

  <footer>
    <h3>Discover</h3>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightgrey;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-evenly;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: blue;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
}

#explore-button {
  color: blue;
  background-color: white;
  border: 2px solid blue;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: large;
  cursor: pointer;
}

#explore-button:hover {
  color: white;
  background-color: blue;
}

#explore-button:active {
  background-color: rgb(14, 73, 141);
}
</style>
