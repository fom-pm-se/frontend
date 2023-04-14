import { defineStore } from "pinia";
import {Settings, SettingsShort} from "@/model/store/Settings";
import axios, {AxiosResponse} from "axios";
import {UpdateSettingRequest} from "@/model/request/UpdateSettingRequest";

export const useSettingsStore = defineStore('settingsStore', {
  state: () => (
    {settings: [] as Settings[], settingsShort: [] as SettingsShort[]}
  ),
  actions: {
    async fetchSettingsShort() {
      const response: AxiosResponse<SettingsShort[]> = await axios.get('http://localhost:8080/api/v1/settings/all');
      this.settingsShort = response.data
    },
    async fetchSettingsLong() {
      const response: AxiosResponse<Settings[]> = await axios.get('http://localhost:8080/api/v1/settings/all/long');
      this.settings = response.data;
    },
    async saveSettings(settings: Settings[]) {
      const settingsRequest: UpdateSettingRequest[] = settings.map((setting: Settings) => {
        return {
          technicalName: setting.technicalName,
          active: setting.active
        }
      });
      const response = await axios.put('http://localhost:8080/api/v1/settings/all', settingsRequest);
      if (response.status === 200) {
        this.settings = response.data;
      }
    },
    findSetting(technicalName: string): SettingsShort {
      for (const setting of this.settingsShort) {
        if (setting.technicalName === technicalName) {
          return setting;
        }
      }
      return {} as SettingsShort;
    }
  }, getters: {
    getSettings(): Settings[] {
      return this.settings;
    },
    getSettingsShort(): SettingsShort[] {
      return this.settingsShort;
    }
  }
})
