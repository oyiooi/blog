export default function toAddComment (data) {
    return {
        type: 'To_Add_Comment',
        comment: data
    }
}