import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StatusBadge from '../../../components/characters/StatusBadge.vue'

describe('StatusBadge', () => {
  it('matches snapshot', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        status: 'alive'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
