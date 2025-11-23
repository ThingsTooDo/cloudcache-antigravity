export function AnnouncementBar(props = {}) {
    const { message, type = 'info' } = props;
    // If no message provided, return empty string (component not used)
    if (!message) {
        return '';
    }
    return `
    <div class="announcement-bar announcement-bar-${type}">
      <div class="announcement-content">${message}</div>
    </div>
  `;
}
