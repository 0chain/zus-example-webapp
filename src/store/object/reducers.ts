import types, { ObjectState } from './types'
import initialState from './initialState'
import { addPropToObject } from './helpers'

import { getArrayDifference, normalizedPath } from 'lib/utils'

export function objectReducer(state: ObjectState = initialState, action) {
  switch (action.type) {
    case types.CLEAR_OBJECT_STATE:
      return initialState
    case types.SET_LOADING:
      return { ...state, filesLoading: action.payload }
    case types.GET_PATH_FILES_SUCCESS: {
      const allocationsFilesMap = { ...state.allocationsFilesMap }

      const { payload, assets } = action
      const { path, lookup_hash } = payload?.meta_data || {}
      const { allocationId } = assets

      if (!allocationId || !path) {
        console.warn('Bad path files response format', action, allocationId)
        return state
      }

      let filesMap = { [lookup_hash]: { ...payload } }

      if (allocationsFilesMap[allocationId]) {
        filesMap = { ...allocationsFilesMap[allocationId], ...filesMap }
      }

      payload?.list?.forEach((obj, index) => {
        filesMap[obj.lookup_hash] = obj
        filesMap[lookup_hash].list[index] = obj.lookup_hash
      })

      allocationsFilesMap[allocationId] = filesMap
      return { ...state, allocationsFilesMap, activePath: path }
    }

    case types.GET_0NFTSERV_PUBLIC_UUID_SUCCESS: {
      const { payload, assets } = action
      const { allocationId, lookupHash } = assets

      const allocationsFilesMap = addPropToObject({
        objectPayload: { public0nftUUID: payload },
        allocationId,
        lookupHash,
        state,
      })

      return { ...state, allocationsFilesMap }
    }
    case types.LIST_OBJECTS_SUCCESS: {
      const { walletId, allocationId, data, allocation } = action.payload
      if (!walletId || !allocationId || !data || !allocation.id) {
        return state
      }

      const wallets = { ...state.wallets }
      const allocations = { ...(wallets[walletId] || {}) }

      const { path, list } = data
      const oldFiles = [...(allocations[allocationId] || [])].filter(
        it => normalizedPath(it.parent_path) !== normalizedPath(path)
      )

      let newList = list?.map(item => ({
        ...item,
        parent_path: normalizedPath(item.parent_path),
      }))

      newList = getArrayDifference(newList, oldFiles, 'lookup_hash')

      allocations[allocationId] = [...oldFiles, ...newList]
      wallets[walletId] = allocations

      return { ...state, wallets }
    }

    case types.GET_FILE_STATS_SUCCESS:
      return { ...state, filesStats: action.payload }

    case types.ADD_FILE_OPERATION: {
      return { ...state, filesOps: action.payload }
    }
    case types.REMOVE_FILE_OPERATION: {
      return { ...state, filesOps: action.payload }
    }
    case types.CLEAR_FILE_OPERATIONS: {
      return { ...state, filesOps: [] }
    }

    case types.SET_MULTI_SELECTION: {
      return { ...state, multiSelect: action.payload }
    }
    case types.ADD_TO_MULTI_SELECTION: {
      return { ...state, multiSelect: action.payload }
    }
    case types.REMOVE_FROM_MULTI_SELECTION: {
      return { ...state, multiSelect: action.payload }
    }
    case types.CLEAR_MULTI_SELECTION_LIST: {
      return { ...state, multiSelect: action.payload }
    }

    case types.SET_CURRENT_PATH:
      return { ...state, currentPath: action.payload }
    case types.SET_CURRENT_PATH_FILES:
      return { ...state, currentPathFiles: action.payload }

    case types.ADD_PRIVATE_LINK:
      return { ...state, privateLinks: action.payload }
    case types.REMOVE_PRIVATE_LINK:
      return { ...state, privateLinks: action.payload }
    case types.RESET_FILE_PERMISSION:
      return { ...state, privateLinks: action.payload }

    case types.SET_SEARCHING_FILES:
      return { ...state, isSearchingFiles: action.payload }

    case types.ADD_TO_ALL_FILES:
      return { ...state, allFiles: action.payload }
    case types.REMOVE_FROM_ALL_FILES: {
      const { files, allocationId, walletId } = action.payload
      if (!files || !allocationId || !walletId) return state

      const wallets = { ...state.wallets }
      const allocations = { ...(wallets[walletId] || {}) }

      allocations[allocationId] = files
      wallets[walletId] = allocations

      return { ...state, wallets }
    }
    case types.SET_ALL_FILES:
      return { ...state, allFiles: action.payload }
    case types.CLEAR_ALL_FILES:
      return { ...state, allFiles: [], wallets: [] }

    case types.ADD_FILE_EFFECT:
      return { ...state, effects: action.payload }
    case types.REMOVE_FILE_EFFECT:
      return { ...state, effects: action.payload }
    case types.CLEAR_ALL_FILE_EFFECTS:
      return { ...state, effects: [] }

    case types.ADD_EFFECTED_FILES:
      return { ...state, effectedFiles: action.payload }
    case types.REMOVE_EFFECTED_FILES:
      return { ...state, effectedFiles: action.payload }
    case types.CLEAR_EFFECTED_FILES:
      return { ...state, effectedFiles: [] }

    case types.ADD_THUMBNAIL:
      return { ...state, thumbnails: action.payload }
    case types.REMOVE_THUMBNAIL:
      return { ...state, thumbnails: action.payload }
    case types.CLEAR_ALL_THUMBNAILS:
      return { ...state, thumbnails: {} }

    case types.ADD_VIDEO_LOADING:
      return {
        ...state,
        videoLoadings: {
          ...state.videoLoadings,
          [action.payload]: true,
        },
      }
    case types.REMOVE_VIDEO_LOADING:
      return {
        ...state,
        videoLoadings: {
          ...state.videoLoadings,
          [action.payload]: false,
        },
      }
    case types.CLEAR_ALL_VIDEO_LOADINGS:
      return { ...state, videoLoadings: {} }

    case types.SET_PRIVATE_SHARED_FILES:
      return { ...state, privateSharedFiles: action.payload }
    case types.SET_ALL_PRIVATE_SHARED_FILES:
      return { ...state, allPrivateSharedFiles: action.payload }
    case types.ADD_PRIVATE_SHARED_FILE:
      return { ...state, allPrivateSharedFiles: action.payload }
    case types.REMOVE_PRIVATE_SHARED_FILE: {
      const { allSharedFiles = [], sharedFiles = [] } = action.payload

      return {
        ...state,
        allPrivateSharedFiles: allSharedFiles,
        privateSharedFiles: sharedFiles,
      }
    }
    case types.CLEAR_ALL_PRIVATE_SHARED_FILES:
      return { ...state, allPrivateSharedFiles: [], privateSharedFiles: [] }

    case types.SET_PUBLIC_SHARED_FILES:
      return { ...state, publicSharedFiles: action.payload }
    case types.SET_ALL_PUBLIC_SHARED_FILES:
      return { ...state, allPublicSharedFiles: action.payload }
    case types.ADD_PUBLIC_SHARED_FILE:
      return { ...state, allPublicSharedFiles: action.payload }
    case types.REMOVE_PUBLIC_SHARED_FILE: {
      const { allSharedFiles = [], sharedFiles = [] } = action.payload

      return {
        ...state,
        allPublicSharedFiles: allSharedFiles,
        publicSharedFiles: sharedFiles,
      }
    }
    case types.CLEAR_ALL_PUBLIC_SHARED_FILES:
      return { ...state, allPublicSharedFiles: [], publicSharedFiles: [] }

    case types.SET_UPLOAD_PROGRESS: {
      const { progress, lookupHash } = action.payload
      if (!progress || !lookupHash) return state
      const { upload = {} } = state?.progress || {}

      return {
        ...state,
        progress: {
          ...state.progress,
          upload: { ...upload, [lookupHash]: progress },
        },
      }
    }
    case types.SET_DOWNLOAD_PROGRESS: {
      const { progress, lookupHash } = action.payload
      if (!progress || !lookupHash) return state
      const { download = {} } = state?.progress || {}

      return {
        ...state,
        progress: {
          ...state.progress,
          download: { ...download, [lookupHash]: progress },
        },
      }
    }
    case types.CLEAR_ALL_PROGRESS: {
      return { ...state, progress: { upload: {}, download: {} } }
    }

    case types.LIST_ALL_FILES_SUCCESS: {
      const { allFiles = [], walletId, allocationId } = action.payload

      const wallets = { ...state.wallets }
      const allocations = { ...(wallets[walletId] || {}) }
      allocations[allocationId] = allFiles
      wallets[walletId] = allocations

      return { ...state, wallets, allFiles }
    }

    default:
      return state
  }
}
