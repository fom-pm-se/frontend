<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        title="Administratormenü"
        subtitle="Einstellungen für die Anwendung"
      >
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
        :title="item.title"
        :value="item.title"
        :prepend-icon="item.icon"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const items = [
  {title: 'Benutzereinstellungen', to: '/administrator/users', icon: 'mdi-account-cog'},
  {title: 'Rollen', to: '/administrator/roles', icon: 'mdi-account-group'},
  {title: 'Rechte', to: '/administrator/permissions', icon: 'mdi-account-key'},
  {title: 'Einstellungen', to: '/administrator/settings', icon: 'mdi-cog'},
];
</script>

<style scoped>

</style>
