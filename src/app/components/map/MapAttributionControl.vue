<script lang="ts">
    import { defineComponent } from 'vue';
    import maplibregl from 'maplibre-gl'

    export default defineComponent({
        props: {
        },
        inject: [
            'map'
        ],
        emits: [
        ],
        watch: {
        },
        data() {
            return {
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
            addScaleControl() {
                this.scaleControl = new maplibregl.AttributionControl({
                    customAttribution: 'Fluxguide',
                    compact: true,
                });

                this.map.addControl(this.scaleControl); // , this.position);

                let y = {
                    onAdd() {
                        let x = document.createElement('div');
                        x.classList.add('HELLOWORLD')
                        x.style.width = "50px";
                        x.style.height = "50px";
                        x.style.background = '#1986CA';
                        return x;
                    },
                    onRemove() {

                    }
                }

                this.map.addControl(y); // , this.position);
            },
            removeScaleControl() {
                if (this.map) {
                    this.map.removeControl(this.scaleControl);
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
