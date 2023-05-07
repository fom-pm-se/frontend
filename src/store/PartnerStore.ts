import {defineStore} from "pinia";
import {Partner} from "@/model/store/Partner";
import axios, {AxiosResponse} from "axios";
import {API_GET_PARTNER_LIST, API_GET_PARTNER_TYPES} from "@/axios/ApiConstants";
import {CreatePartner} from "@/model/request/CreatePartner";

export const usePartnerStore = defineStore('partnerStore', {
  state: () => (
    {partners: [] as Partner[], isLoading: false as boolean, partnerTypes: [] as string[]}
  ),
  actions: {
    async fetchPartners(): Promise<void> {
      this.isLoading = true
      const response: AxiosResponse<Partner[]> = await axios.get(API_GET_PARTNER_LIST)
      if (response.status !== 200) {
        this.isLoading = false
        return Promise.reject(response)
      }
      this.partners = response.data
      this.isLoading = false
      return Promise.resolve()
    },
    async fetchPartnerTypes(): Promise<void> {
      this.isLoading = true
      const response: AxiosResponse<string[]> = await axios.get(API_GET_PARTNER_TYPES)
      if (response.status !== 200) {
        this.isLoading = false
        return Promise.reject(response)
      }
      this.partnerTypes = response.data
      this.isLoading = false
      return Promise.resolve()
    },
    async addPartner(partner: CreatePartner): Promise<void> {
      this.isLoading = true
      const response: AxiosResponse<Partner> = await axios.post(API_GET_PARTNER_LIST, partner)
      if (response.status !== 200) {
        this.isLoading = false
        return Promise.reject(response)
      }
      this.partners.push(response.data)
      this.isLoading = false
    },
    async fetchPartnerById(id: any): Promise<Partner> {
      this.isLoading = true
      const response: AxiosResponse<Partner> = await axios.get(API_GET_PARTNER_LIST + '/' + id)
      if (response.status !== 200) {
        this.isLoading = false
        return Promise.reject(response)
      }
      this.isLoading = false
      return Promise.resolve(response.data as Partner)
    }
  }
})
