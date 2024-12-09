const mockData = {
    postGroup: [
        {
            id: 1,
            avatar: "https://th.bing.com/th/id/R.60bcab15ef9b8b7d0ac3f7052053b317?rik=MpYIXi%2bQQnGzJQ&pid=ImgRaw&r=0",
            name: "Hoàng Phúc",
            image: "https://i.ex-cdn.com/nongnghiep.vn/files/content/2022/09/21/ngan-truoi-15-222746_534.jpg",
            location: "Hà Tĩnh",
            time: 2
        },
        {
            id: 2,
            name: "Lê Văn Phú",
            avatar: "https://i.pinimg.com/736x/2d/c3/a4/2dc3a4337f95c42a8c885edb9374fd39.jpg",
            image: "https://th.bing.com/th/id/OIP.A7LNsvY__62dingWGyfRyAHaFj?rs=1&pid=ImgDetMain",
            location: "Quảng Trị",
            time: 4
        },
        {
            id: 3,
            name: "Lê Võ Duy Khiêm",
            avatar: "https://i.pinimg.com/originals/b3/ee/87/b3ee876c70f3e4379c17f06b0cd4ae8a.jpg",
            image: "https://culaochamtourist.vn/wp-content/uploads/2021/07/canh-dep-quang-ngai-8-768x480.jpg",
            location: "Quảng Ngãi",
            time: 5
        },
        {
            id: 4,
            name: "Nguyễn Minh Trí",
            avatar: "https://vnn-imgs-f.vgcloud.vn/2021/08/11/16/jack-se-phai-bien-mat-khoi-showbiz-1.jpeg",
            image: "https://thamhiemmekong.com/wp-content/uploads/2020/02/con-phung.jpg",
            location: "Bến Tre",
            time: 5
        },
    ],

    buddies: [
        {
            id: 1,
            name: "Hoàng Phúc",
            avatar: "https://th.bing.com/th/id/OIP.Ypl_sg1NvXelL9QzJ1lKagHaHa?rs=1&pid=ImgDetMain",
        },
        {
            id: 2,
            name: "Lê Văn Phú",
            avatar: "https://th.bing.com/th/id/OIP.klxNCgcMlcIo20ExtOdjVQHaHZ?rs=1&pid=ImgDetMain",
        },
        {
            id: 3,
            name: "Lê Võ Duy Khiêm",
            avatar: "https://cdn.tuoitre.vn/471584752817336320/2023/10/15/base64-1697371188123490553865.png",
        },
        {
            id: 4,
            name: "Nguyễn Minh Trí",
            avatar: "https://vnn-imgs-f.vgcloud.vn/2021/08/11/16/jack-se-phai-bien-mat-khoi-showbiz-1.jpeg",
        },
        {
            id: 5,
            name: "Mom",
            avatar: "https://th.bing.com/th/id/OIP.Ox7PfgqSmwTBQkKM9wmDwQHaKI?rs=1&pid=ImgDetMain",
        },
        {
            id: 6,
            name: "Boss",
            avatar: "https://th.bing.com/th/id/OIP.pft29khUige-u4c2OmSxKwAAAA?rs=1&pid=ImgDetMain",
        },
    ],

    groups: [
        {
            id: 1,
            name: "Family",
            avatar: "https://th.bing.com/th/id/OIP.UCuDpMlqBpgLFFyg2OmwtQAAAA?rs=1&pid=ImgDetMain",
        },
        {
            id: 2,
            name: "Bóng bánh Cúi Tuần",
            avatar: "https://th.bing.com/th/id/OIP.q9yYNDBRdV_xmX8PCsFyJgHaEK?rs=1&pid=ImgDetMain",
        },
    ],

    detailPost: {
        content: "Thành cổ Quảng Trị nhá ae",
        user: {
            id: 2,
            name: "Lê Văn Phú",
            avatar: "https://th.bing.com/th/id/OIP.klxNCgcMlcIo20ExtOdjVQHaHZ?rs=1&pid=ImgDetMain",
        },
        image: "https://th.bing.com/th/id/OIP.A7LNsvY__62dingWGyfRyAHaFj?rs=1&pid=ImgDetMain",
        location: "Quảng Trị",
        time: 4,
        totalComment: 10,
        firstUserComment: "Lê Võ Duy Khiêm"
    },

    groupMembers: [
        {
            id: 1,
            name: "Hoàng Phúc",
            avatar: "https://th.bing.com/th/id/OIP.Ypl_sg1NvXelL9QzJ1lKagHaHa?rs=1&pid=ImgDetMain",
            relationship: "Friend",
            isAdmin: true,
        },
        {
            id: 2,
            name: "Lê Văn Phú",
            avatar: "https://th.bing.com/th/id/OIP.klxNCgcMlcIo20ExtOdjVQHaHZ?rs=1&pid=ImgDetMain",
            relationship: "Friend",
            isAdmin: false,
        },
        {
            id: 3,
            name: "Lê Võ Duy Khiêm",
            avatar: "https://cdn.tuoitre.vn/471584752817336320/2023/10/15/base64-1697371188123490553865.png",
            relationship: "Friend",
            isAdmin: false,
        },
        {
            id: 4,
            name: "Nguyễn Minh Trí",
            avatar: "https://vnn-imgs-f.vgcloud.vn/2021/08/11/16/jack-se-phai-bien-mat-khoi-showbiz-1.jpeg",
            relationship: "Friend",
            isAdmin: false,
        },
    ],

    approvalMembers: [
        {
            id: 1,
            name: "Mohamed EnSaty",
            avatar: "https://th.bing.com/th/id/R.3e29d879b374e9a88a71307a9e3405e6?rik=KmembxtwhDzK%2bw&pid=ImgRaw&r=0",
            relationship: "Friend",
        },
        {
            id: 2,
            name: "Kim Richa",
            avatar: "https://th.bing.com/th/id/OIP.I0-4e0wGmsTCe3ORw9lBQwAAAA?rs=1&pid=ImgDetMain",
            relationship: "Friend",
        },
    ]
}

export default mockData