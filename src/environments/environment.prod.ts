export const environment = {
  production: true,
  backendUrl: 'https://khong-gian-truyen.herokuapp.com/',
  debug: true,
  useMockService: false,
  features: {
    productDetail: {
      comment: {
        size: 5
      }
    },
    productPaging: {
      size: 9
    },
    popularProduct: {
      isEnable: false
    },
    topNewProduct: {
      isEnable: false
    },
    topViewProduct: {
      isEnable: false
    },
    sidebar: {
      topViewProduct: {
        isEnable: false
      }
    }
  }
};
