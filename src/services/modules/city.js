import sxRequest from '../request'

export function getCityAll() {
  return sxRequest.get({
    url: '/city/all'
  })
}