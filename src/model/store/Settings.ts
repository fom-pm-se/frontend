export interface SettingsShort {
  technicalName: string;
  active: boolean;
}
export interface Settings extends SettingsShort {
  name: string;
  description: string;
}
