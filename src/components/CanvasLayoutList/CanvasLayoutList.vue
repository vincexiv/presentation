<template>
    <div v-for="layout in layoutList" :key="layout.id">
        <div v-for="structure in layout.structure" :key="structure.id">
            <div :style="getStyle(structure)"></div>
        </div>
    </div>
</template>

<script>
import layoutList from './layoutList'

export default

</script>
<style>
</style>