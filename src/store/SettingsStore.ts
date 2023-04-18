import { defineStore } from "pinia";
import {Settings, SettingsShort} from "@/model/store/Settings";
import axios, {AxiosResponse} from "axios";
import {UpdateSettingRequest} from "@/model/request/UpdateSettingRequest";
import {API_GET_ALL_SETTINGS_LONG, API_GET_ALL_SETTINGS_SHORT} from "@/axios/ApiConstants";

export const useSettingsStore = defineStore('settingsStore', {
  state: () => (
    {settings: [] as Settings[], settingsShort: [] as SettingsShort[]}
  ),
  actions: {
    async fetchSettingsShort() {
      const response: AxiosResponse<SettingsShort[]> = await axios.get(API_GET_ALL_SETTINGS_SHORT);
      this.settingsShort = response.data
    },
    async fetchSettingsLong() {
      const response: AxiosResponse<Settings[]> = await axios.get(API_GET_ALL_SETTINGS_LONG);
      this.settings = response.data;
    },
    async saveSettings(settings: Settings[]) {
      const settingsRequest: UpdateSettingRequest[] = settings.map((setting: Settings) => {
        return {
          technicalName: setting.technicalName,
          active: setting.active
        }
      });
      const response = await axios.put(API_GET_ALL_SETTINGS_SHORT, settingsRequest);
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
