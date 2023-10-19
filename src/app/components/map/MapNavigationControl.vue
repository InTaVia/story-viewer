<script lang="ts">
    import { defineComponent } from 'vue';
    import maplibregl from 'maplibre-gl'

    export default defineComponent({
        props: {
            showCompass: {
                type: Boolean,
                default: true
            },
            showZoom : {
                type: Boolean,
                default: true
            },
            visualizePitch : {
                type: Boolean,
                default: true
            },
        },
        inject: [
            'map'
        ],
        emits: [],
        watch: {
            showCompass() {
                this.reloadNavigationCtrl();
            },
            showZoom() {
                this.reloadNavigationCtrl();
            },
            visualizePitch() {
                this.reloadNavigationCtrl();
            },
        },
        data() {
            return {
                navigation: null
            };
        },
        mounted() {
            this.$nextTick(() => {
                if (!this.map) {
                    console.error("[NavigationControl] Map not found.")
                }

                this.addNavigationCtrl()
            });
        },
        methods: {
            reloadNavigationCtrl() {
                this.removeNavigationCtrl();
                this.addNavigationCtrl();
            },
            addNavigationCtrl() {
                this.navigation = new maplibregl.NavigationControl({
                    showCompass: this.showCompass,
                    showZoom : this.showZoom,
                    visualizePitch : this.visualizePitch,
                });

                this.map.addControl(this.navigation, this.position);
            },
            removeNavigationCtrl() {
                if (this.map) {
                    if(this.map.removeControl) {
                        this.map.removeControl(this.navigation);
                    }
                }
            }
        },
        updated() {
        },
        //beforeUnmount() {
        unmounted() {
            if(this.removeNavigationCtrl) this.removeNavigationCtrl();
        },
    });
</script>

<template></template>

<style>
    /*
    .maplibregl-ctrl button.maplibregl-ctrl-compass .maplibregl-ctrl-icon {
    }

    .maplibregl-ctrl button.maplibregl-ctrl-zoom-in .maplibregl-ctrl-icon {

    }
    .maplibregl-ctrl button.maplibregl-ctrl-zoom-out .maplibregl-ctrl-icon {

    }
    .maplibregl-ctrl button {
    }
    */
</style>
