<script lang="ts">
    import { defineComponent } from 'vue';
    import maplibregl from 'maplibre-gl'

    export default defineComponent({
        props: {
            maxWidth: {
                type: Number,
                default: 100
            },
            unit : {
                type: String,
                default: 'metric' // 'imperial' , 'metric' or 'nautical'
            },
        },
        inject: [
            'map'
        ],
        emits: [
        ],
        watch: {
            maxWidth() {
                this.reloadScaleControl();
            },
            unit() {
                this.reloadScaleControl();
            },
        },
        data() {
            return {
                scaleControl: null
            };
        },
        mounted() {
            this.$nextTick(() => {
                if (!this.map) {
                    console.error("[NavigationControl] Map not found.")
                }

                this.addScaleControl()
            });
        },
        methods: {
            reloadScaleControl() {
                this.removeScaleControl();
                this.addScaleControl();
            },
            addScaleControl() {
                this.scaleControl = new maplibregl.ScaleControl({
                    'maxWidth': this.maxWidth,
                    'unit': this.unit
                });

                this.map.addControl(this.scaleControl); // , this.position);
            },
            removeScaleControl() {
                if (this.map) {
                    if(this.map.removeControl) this.map.removeControl(this.scaleControl);
                }
            }
        },
        updated() {

        },
        //beforeUnmount() {
        unmounted() {
            this.removeScaleControl();
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
