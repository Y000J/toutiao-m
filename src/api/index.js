import { articleDetails, articleList, collectArticle, followUser, praise, removePraise, uncollectArticle, unfollowUser } from "./article";
import { addChannel, deleteAssignChannel, getUserAllChannel, getUserChannelList, } from "./home";
import { editUserData, login, myInfo, sendSms, userData } from "./user";
import { delSearchHistory, getHistory, searchResult, searchSuggest } from './search';
import { addComment, commendComment, delCommendComment, getComment } from "./comment";
export const loginAPI = login
export const myInfoAPI = myInfo
export const sendSmsAPI = sendSms
export const getUserChannelListAPI = getUserChannelList
export const articleListAPI = articleList
export const getUserAllChannelAPI = getUserAllChannel
export const deleteAssignChannelAPI = deleteAssignChannel
export const addChannelAPI = addChannel
export const getHistoryAPI = getHistory
export const searchResultAPI = searchResult
export const searchSuggestAPI = searchSuggest
export const delSearchHistoryAPI = delSearchHistory
export const articleDetailsAPI = articleDetails
export const followUserAPI = followUser
export const unfollowUserAPI = unfollowUser
export const collectArticleAPI = collectArticle
export const uncollectArticleAPI = uncollectArticle
export const praiseAPI = praise
export const removePraiseAPI = removePraise
export const getCommentAPI = getComment
export const commendCommentAPI = commendComment
export const delCommendCommentAPI = delCommendComment
export const addCommentAPI = addComment
export const userDataAPI = userData
export const editUserDataAPI = editUserData