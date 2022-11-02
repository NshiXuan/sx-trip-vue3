import sxRequest from '../request'

export function getDetailInfos(houseId) {
  return sxRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}