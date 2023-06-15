import React from 'react'

export  function chat({datos}) {
  return (
    <div>
        <div aria-live="polite" aria-atomic="true" class="bg-dark position-relative bd-example-toasts">
            <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" id="toastPlacement">
                <div class="toast">
                <div class="toast-header">
                    <img src="..." class="rounded me-2" alt="..." />
                    <strong class="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </div>
                <div class="toast-body">
                    Hello, world! This is a toast message.
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
