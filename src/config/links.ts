interface NavLink {
  route: string
  path: string
}

export const navLinks: NavLink[] = [
  {
    route: 'Home',
    path: '/'
  },
  {
    route: 'Rate a barber',
    path: '/rate-a-barber'
  },
  {
    route: 'Find a barber',
    path: '/find-a-barber'
  }
]
