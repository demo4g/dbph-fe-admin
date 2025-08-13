import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ISidebarMenuITem } from '.';

// Chỉ render menu 2 cấp
export const renderNavLink = (data: ISidebarMenuITem[]) => {
  const paths = window.location.pathname.split('/').filter((path) => !!path);

  // Kiểm tra xem có menu nào được active dựa theo url ko
  const hasMenuActive = data.some((e) => {
    const childrens = e.children;

    if (Array.isArray(childrens) && childrens.length > 0) {
      return paths.some((path) => childrens?.find((child) => child.path === path));
    }

    return e.path && paths.includes(e.path);
  });

  return data?.map((e, index) => {
    const { path, title, children, icon } = e;

    const childrens = children;

    // render menu 2 cấp
    if (Array.isArray(childrens) && childrens.length > 0) {
      let active = childrens.some(
        (c) => !!c.path && window.location.pathname.split('/').includes(c.path)
      );

      //nếu không có menu nào được active => active menu đầu tiên
      if (!hasMenuActive && index === 0) active = true;

      return (
        <NavLink
          key={index}
          component={Link}
          to={path || '#'} //Nếu là menu cha không cần path
          title={title}
          label={title}
          leftSection={icon}
          active={active}
          defaultOpened={active}
        >
          {childrens.map((child, index2) => {
            const { path, title, icon } = child;

            let active = !!path && window.location.pathname.split('/').includes(path);

            //nếu không có menu nào được active => active menu đầu tiên
            if (!hasMenuActive && index === 0 && index2 === 0) active = true;

            return (
              <NavLink
                key={index2}
                component={Link}
                to={path || '#'} //Nếu là menu cha không cần path
                title={title}
                label={title}
                leftSection={icon}
                active={active}
              />
            );
          })}
        </NavLink>
      );
    }

    let active = !!path && window.location.pathname.split('/').includes(path);

    //nếu không có menu nào được active => active menu đầu tiên
    if (!hasMenuActive && index === 0) active = true;

    // render menu 1 cấp
    return (
      <NavLink
        key={index}
        component={Link}
        to={path || '#'} //Nếu là menu cha không cần path
        title={title}
        label={title}
        leftSection={icon}
        active={active}
      />
    );
  });
};
