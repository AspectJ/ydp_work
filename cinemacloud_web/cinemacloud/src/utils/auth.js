
export default (params) => {
  const ALL_AUTH = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).role.menuList : [];

  let filtered = [];
  params.map(current => {
    const index = ALL_AUTH.findIndex(auth => {
        return auth.menuid === current;
    });

    if( index !== -1 ){
        filtered.push(current);
    }
  });

  return filtered;
}
