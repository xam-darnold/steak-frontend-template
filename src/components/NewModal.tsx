import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function NewModal({ open, onClose }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Overlay />
      <Dialog.Title>Deactivate account</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p className="h-screen bg-red-400">
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button onClick={onClose}>Deactivate</button>
      <button onClick={onClose}>Cancel</button>
    </Dialog>
  )
}
