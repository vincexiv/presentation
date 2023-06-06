<template>
    <div id="navbar">
        <h1>Navbar</h1>
    </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
#navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--navbar-height);
    background-color: #d4d4d4;
    color: black;
    z-index: 1;
}
</style>