<template>
	<button @click="closeSystemMenu()">System Menu Schließen</button>
	<hr />


	<!-- SYSTEM NUMPAD -->
	<div class="numpad" style="display: none"></div>



	<!-- SYSTEM MENU -->
	<div class="system-menu">
		<div class="section">
			<h4>Neustarten</h4>
			<button @click="restartWithSameVisitor()">Neustarten</button>
			<button @click="restartWithNewVisitor()">Neustarten (als neuer Benutzer)</button>
		</div>

		<div v-if="fg.state.device.isInhouseApp" class="section">
			<h4>Inhouse App</h4>
			<button @click="stopKiosk()">Kiosk Modus beenden</button>
			<button @click="startKiosk()">Kiosk Modus starten</button>
			<button @click="openAndroidSettings()">Android Settings</button>
		</div>

		<div v-if="fg.state.device.isInhouseApp" class="section">
			<h4>Tourguiding</h4>
			<button @click="startPublisherMode()">*Start Publisher Mode</button>
			<button @click="startSubscriberMode()">*Start Subscriber Mode</button>
			<button @click="stopTourguidingMode()">*Stop Tourguiding Mode</button>
		</div>
	</div>



	<!-- ADMIN SYSTEM MENU (for admin-stuff) -->
	<div class="system-menu-admin" style="display: none">
		<div class="section">
			<h4>Overrides</h4>
			<!-- TODO -->
			localStorage.fgcordova_override_is_inhouse_app localStorage.fgcordova_override_base_url_app
			localStorage.fgcordova_override_is_debugging_on localStorage.appSettingsOverrideBaseUrl
			localStorage.appSettingsOverrideExhibitionId
		</div>
		<button @click="hardReset()">HARD RESET (all data will be cleared)</button>
	</div>
</template>

<script>
import core from '../../../core/core';

export default {
	components: {},
	methods: {
		closeSystemMenu() {
			fg.state.showSystemMenu = false;
		},
		restartWithSameVisitor() {
			core.restartAppWithSameVisitor();
		},
		restartWithNewVisitor() {
			core.restartAppWithNewVisitor();
		},

		stopKiosk() {
			fg.m.Kiosk.stop_kiosk_mode();
		},
		startKiosk() {
			fg.m.Kiosk.start_kiosk_mode();
		},

        openAndroidSettings() {
            fg.m.Device.openSystemSettings()
        }
	},
};
</script>

<style lang="less" scoped>
button {
    display: block;
    margin: 1.1rem auto;
    border-radius: 5px;
    background-color: #006699;
    font-family: sans-serif;
    font-weight: 300;
    padding: 10px 24px 10px 24px;
    color: #fff;
    font-size: 1rem;
}

.section {
	margin: 1rem;
	padding: 1rem;
	// background-color: #d8d8d8;
	border-radius: 15px;
}
</style>
