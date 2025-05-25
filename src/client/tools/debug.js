export const to_export_on_debug = {}
let is_debug = false

export function export_on_window(items) {
  if (typeof items === 'object') {
    for (const [name, value] of Object.entries(items)) {
      console.log('export', name, value)
      window[name] = value
    }
    return
  }
};

export function on_debug(items) {
  if (typeof items === 'object') {
    for (const [name, value] of Object.entries(items)) {
      to_export_on_debug[name] = value

      if (is_debug) {
        console.log('export', name, value)
        window[name] = value
      }
    }
  }
}

export function _set_debug(value) {
  is_debug = value
}

export function get_debug() {
  return is_debug
}

window.to_export_on_debug = to_export_on_debug
