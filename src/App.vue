<style>
#app {
    background-image: url(./assets/images/top-stories-events_section-background.jpg)
}
</style>

<template>
<div id="app">
    <navigation id="nav"></navigation>
    <trading id="trading"></trading>
    <PageFooter id = "pagefooter"></PageFooter>
</div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Trading from "./components/Trading.vue";
import PageFooter from "./components/PageFooter.vue";
export default {
    name: "app",
    components: {
        Navigation,
        Trading,
        PageFooter,
    },
    beforeCreate() {
        let appwidth = window.outerWidth;
    },
};
</script>
