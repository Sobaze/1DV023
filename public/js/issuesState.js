import fetch from 'node-fetch'

/**
 * Call to close the issue.
 *
 * @param {number} id - The id of the issue to close.
 *
 */
export async function closeIssues (id) {
  try {
    await fetch(`https://gitlab.lnu.se/api/v4/projects/941/issues/${id}?state_event=close`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': process.env.PRIVATE_ACCESS_TOKEN
      }
    })
  } catch (error) {
    console.error(error)
  }
}
/**
 * Call to open the issue.
 *
 * @param {number} id - The id of the issue to open.
 */
export async function openIssues (id) {
  try {
    await fetch(`https://gitlab.lnu.se/api/v4/projects/941/issues/${id}?state_event=reopen`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': process.env.PRIVATE_ACCESS_TOKEN
      }
    })
  } catch (error) {
    console.error(error)
  }
}
