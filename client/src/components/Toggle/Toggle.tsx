import { Switch } from '@headlessui/react'

interface ToggleProps {
    title: string
    isEnabled: boolean
    toggleSwitch: (value: boolean) => void
}

const Toggle= ({
    title,
    isEnabled,
    toggleSwitch
}: ToggleProps) =>{

  return (
    <div className="flex-row inline-block items-center px-4">

      <span className='text-white mr-2 mb-1'>{title}</span>

    <Switch
      checked={isEnabled}
      onChange={toggleSwitch}
      className={`${
        isEnabled ? 'bg-sky-500' : 'bg-sky-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{title}</span>
      <span
        className={`${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
    </div>

  )
}

export default Toggle