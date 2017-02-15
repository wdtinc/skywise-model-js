"use strict"
require('es6-promise').polyfill()
require('isomorphic-fetch')

var btoa = require('btoa')


class Client {

  constructor(appId, appKey, site = 'https://model.api.wdtinc.com'){
    this.appId = appId
    this.appKey = appKey
    this.auth = btoa(`${this.appId}:${this.appKey}`)
    this.site = site

    this.headers = {
      Accept: 'application/vnd.wdt+json; version=1',
      Authorization: `Basic ${this.auth}`
    }
  }

  fetch(path){
    return fetch(path, {
      headers: this.headers
    })
  }

  getModel(modelId){
    let path = `/models/${modelId}`
    return this.fetch(`${this.site}${path}`)
  }

  listModels(){
    let path = '/models'
    return this.fetch(`${this.site}${path}`)
  }

  getForecast(forecastId){
    let path = `/forecasts/${forecastId}`
    return this.fetch(`${this.site}${path}`)
  }

  listForecasts(modelId){
    let path = `/models/${modelId}/forecasts`
    return this.fetch(`${this.site}${path}`)
  }

  getVariable(variableId){
    let path = `/variables/${variableId}`
    return this.fetch(`${this.site}${path}`)
  }

  listVariables(forecastId){
    let path = `/forecasts/${forecastId}/variables`
    return this.fetch(`${this.site}${path}`)
  }

  getTimeSeries(variableId, latitude, longitude){
    let path = `/variables/${variableId}/timeseries/${latitude}/${longitude}`
    return this.fetch(`${this.site}${path}`)
  }
}


module.exports = Client
