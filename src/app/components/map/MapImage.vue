<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import maplibregl, { Map, MapOptions, PositionAnchor, Marker, StyleSpecification } from 'maplibre-gl'

    export default defineComponent({
        props: {
            latlng: {
                type: Object as PropType<Pin>,
                required: true,
            },

        },
        inject: [
            'map'
        ],
        emits: [
        ],
        watch: {
            latlng: {
                handler(newValue) {
                    if (this.marker) {
                        this.marker.setLngLat([newValue.lng, newValue.lat]);
                    }
                },
                deep: true
            },
        },
        data() {
            return {
                layerName: 'image'
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.addPin(this.latlng.lng, this.latlng.lat);
                this.bindDragEvents();
            });
        },
        updated() {
            if (!this.$el.children.length) {
                // DOM Element is not recreated by vue, nothing to do.
                return false;
            }

            this.$nextTick(() => {
                this.marker.remove();
                this.addPin(this.latlng.lng, this.latlng.lat);
            });
        },
        //beforeUnmount() {
        unmounted() {
            if (this.map && this.marker) {
                this.marker.remove();
            }
        },
        methods: {
            addImage() {

            }
            addPin(lat: any, lng: any) {
                this.marker = new maplibregl.Marker({
                    element: this.$el.children[0],
                    draggable: this.draggable,
                    anchor: this.anchor,
                })

                if (!this.marker) {
                    console.error('Create of new marker failed.', this.marker)
                    return false;
                }

                this.marker.getElement().style.zIndex = (1000 + this.zIndex);
                this.marker.setLngLat([this.latlng.lng, this.latlng.lat]).addTo(this.map);
            },
            bindDragEvents() {
                if (this.draggable) {
                    this.marker.on('dragstart', this.onDragStart);
                    this.marker.on('dragend', this.onDragEnd);
                    this.marker.on('drag', this.onMove);
                    return true;
                }

                return false;
            },
            unbindDragEvents() {
                this.marker.off('dragstart');
                this.marker.off('dragend');
                this.marker.off('drag');
            },
            pinClicked(e: Event) {
                e.stopPropagation();
            },
        }
    });
    </script>

    <template>
        <div aria-hidden="true" v-show="false"><!-- parentDiv - keep on original DOM location for vue update -->
            <div
                class="fgMap__pin"
                :class="{
                    'fgMap__pin--draggable': draggable,
                    'fgMap__pin--dragging': isDragging,
                }"
                @click="$emit('pin-click', {id, event: $event})"
            ><slot><div class="fgMap__pinContent" :style="'background:' + bgcolor">{{label}}</div></slot></div>
        </div>
    </template>

    <style>
        .fgMap__pinContent {
            padding: 0.5rem;
            background-color: #1986CA;
            color: #fff;
            border: solid 2px #fff;
            border-radius: 100vmax;
            display: inline-block;
            width: 32px;
            height: 32px;
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            text-align: center;
        }

        .fgMap__pin {
            display: inline-block;
            /* z-index: 1000; */
        }

        .fgMap__pin--draggable {
            position: relative;
            z-index: 2000;
        }

        .fgMap__pin:hover {
            z-index: 2000 !important;
        }

        .fgMap__pin--draggable .fgMap__pinContent {
            background-color: red;
            min-width: 45px;
            min-height: 45px;
            transition: min-width .2s, min-height .2s;
        }
        .fgMap__pin--draggable .fgMap__pinContent:hover {
            min-width: 5px;
            min-height: 5px;
        }
    </style>