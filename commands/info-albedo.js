const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

const embeds = []
const pages = {} 
//Nhét Miêu Tả Vô Mấy Cái ' ' Hoặc " ", Nếu Mà " " Mà Fail, Thì Dùng Lấy Cái ' ' Thay Thế
const descriptions = [
    '<:LArrow:985422675306487829>**__Độ Hiếm__**<:RArrow:985422859994271744>\n  <:5s:985115304961134612><:5s:985115304961134612><:5s:985115304961134612><:5s:985115304961134612><:5s:985115304961134612>\n\n<:LArrow:985422675306487829>**__Mô Tả__**<:RArrow:985422859994271744>\n Người Đứng Đầu Trong Các Giả Kim Thuật Sĩ Kiêm Đội Trưởng Tiểu Đội Điều Tra Của Đội Kỵ Sĩ Tây Phong, Được Gọi Là Thiên Tài "Kreideprinz"\n\n<:LArrow:985422675306487829>**__Vũ Khí__**<:RArrow:985422859994271744>\nKiếm Đơn <:swordnormalatk:985115782319067186>\n\n<:LArrow:985422675306487829>**__Nguyên Liệu__**<:RArrow:985422859994271744>\n> • Sách Thiên Phú: <:ballad:985113941778759680>\n> • Boss: <:childetusk:985114026113630228>\n> • Nguyên Liệu Đột Phá: <:basalt:985114185140666438><:cecilia:985114254095032390><:prithiva:985114127758405683><:devining:985114310638465054>\n\n<:LArrow:985422675306487829>**__Hướng Build__**<:RArrow:985422859994271744>\n Sub-DPS\n\n<:LArrow:985422675306487829>**__Mẹo Kĩ Năng__**<:RArrow:985422859994271744>\nKĩ Năng Nguyên Tố Của Albedo Rơi Các Hạt Tinh Thể Một Cách Random Giống Như Của Zhongli, Nhưng Với Số Lượng Tốt Hơn\n\n<:LArrow:985422675306487829>**__Chỉ Số Chính__**<:RArrow:985422859994271744>\n> •<:sands:985113511413817344> Đồng Hồ: DEF%\n> • <:goblet:985113549447774248> Ly: ST Nham\n> • <:circlet:985113626119639110> Mũ: Tỉ Lệ Bạo/ST Bạo/DEF%\n\n<:LArrow:985422675306487829>**__Chỉ Số Phụ__**<:RArrow:985422859994271744>\n> 1 • Tỉ Lệ Bạo/ST Bạo\n> 2 • DEF%\n> 3 • ATK%\n> 4 • Hiệu Quả Nạp\n> 5 • DEF +n\n> 6 • ATK+n\n\n<:LArrow:985422675306487829>**__Ưu Tiên Thiên Phú__**<:RArrow:985422859994271744>\n Skill > Nộ > Tấn Công Thường',
    "<:LArrow:985422675306487829>**__Các Loại Vũ Khí__**<:RArrow:985422859994271744>\n> 1 • <:5s:985115304961134612> <:primodal:985114571910025266> [Bàn Nham Kết Lục](https://paimon.moe/weapons/primordial_jade_cutter)\n> 2 • <:4s:985115524692336661> <:cinnabar:985114635143360553> [Con Thoi Chu Sa](https://paimon.moe/weapons/cinnabar_spindle)\n> 3 • <:3s:985115594401673266> <:harbringerdawn:985114697290354688> [Thần Kiếm Lê Minh](https://paimon.moe/weapons/harbinger_of_dawn)\n> 4 • <:5s:985115304961134612> <:mistsplitter:985114778722783232> [Ánh Sáng Đêm Sương Mù](https://paimon.moe/weapons/mistsplitter_reforged)\n> 5 • <:5s:985115304961134612> <:fsworn:985114881667788800> [Lời Thề Tự Do Cổ Xưa](https://paimon.moe/weapons/freedom-sworn)\n\n<:LArrow:985422675306487829>**__Bộ Thánh Di Vật__**<:RArrow:985422859994271744>\n> 1 • <:huskflower:985111782714658876> Giấc Mộng Phù Hoa **`4`**\n> 2 • <:huskflower:985111782714658876> Giấc Mộng Phù Hoa **`2`** <:archaicflower:985112133324918814> Phiến Đá Lâu Đời **`2`**\n> 3 • <:noblesseflower:985112506857050182> Nghi Thức Tông Thất Cổ **`2`** <:archaicflower:985112133324918814> Phiến Đá Lâu Đời **`2`**\n> 4 • <:tenacityflower:985112785237196820> Thiên Nham Vững Chắc **`4`**\n> 5 • <:noblesseflower:985112506857050182> Nghi Thức Tông Thất Cổ **`4`**",
    "<:LArrow:985422675306487829>**__Cung Mệnh__**<:RArrow:985422859994271744>\n> 1 • <:albedoc1:985116588275540009> **Hoa Địa Đàng** - Khi Hoa Khoảnh Khắc Được Tạo Ta Từ `Thuật Sáng Thế - Chế Tạo Mặt Trời` Của Albedo Bung Nở, Sẽ Hồi 1.2 Điểm Năng Lượng Nguyên Tố Cho Albedo.\n\n> 2 • <:albedoc2:985116654281306172> **Liên Đại Hiển Sinh** - Khi Hoa Khoảnh Khắc Từ `Thuật Sáng Thế - Chế Tạo Mặt Trời` Nở, Sẽ Ban Hiệu Quả Sinh Tử Cho Albedo, Kéo Dài 30s:\n> ·Khi Thi Triển Chiêu `Giáng Sinh - Sóng Vỗ Đại Lục` Sẽ Xóa Tất Cả Hiệu Quả Sinh Tử Và Tăng Sát Thương Nổ Của `Chiêu Giáng Sinh - Sóng Vỗ Đại Lục` Cũng Như Sát Thương Do Hoa Sinh Tử Gây Ra Theo Số Tầng Bị Xóa.\n> ·Mỗi Tầng Sinh Tử Sẽ Tăng Sát Thương Bằng 30% Phòng Ngự Của Albedo.\n> ·Hiệu Quả Này Tối Đa Cộng Dồn 4 Lần.\n\n> 3 • <:albedoc3:985116710346571807> **Ánh Sáng Mặt Trời** - Cấp Kỹ Năng `Thuật Sáng Thế - Chế Tạo Mặt Trời` +3.\n> Tăng Tối Đa Đến Cấp 15.\n\n> 4 • <:albedoc4:985116762548871188> **Sự Giáng Thế Của Thần** - Nhân Vật Trong Đội Trên Trận Ở Khu Vực Hoa Mặt Trời Sẽ Tăng 30% Sát Thương Tấn Công Khi Đáp Tạo Ra.\n\n> 5 • <:albedoc5:985116816898687036> **Thủy Triều Cổ Đại** - Cấp Kỹ Năng `Chiêu Giáng Sinh - Sóng Vỗ Đại Lục` +3.\n> Tăng Tối Đa Đến Cấp 15.\n\n> 6 • <:albedoc6:985116881750990909> **Đất Tinh Khiết** - Nhân Vật Trong Đội Trên Trận Ở Khu Vực Hoa Mặt Trời, Nếu Đang Được Bảo Vệ Bởi Khiên Sinh Ra Từ Phản Ứng Kết Tinh, Thì Sát Thương Tạo Thành Sẽ Tăng 17%.\n\n<:LArrow:985422675306487829>**__Thiên Phú__**<:RArrow:985422859994271744>\n> 1 • <:swordnormalatk:985115782319067186> **Tấn Công Thường - Tây Phong Kiếm Thuật - Bạch**\n> Tấn Công Thường\n> Thực Hiện Tối Đa 5 Lần Đánh Kiếm Liên Tiếp.\n> Trọng Kích\n> Tiêu Hao Thể Lực Nhất Định, Đánh Ra Hai Kiếm Về Phía Trước Trong Chớp Mắt.\n> Tấn Công Khi Đáp\n> Đáp Xuống Đất Từ Trên Không, Tấn Công Kẻ Địch Trên Đường Và Gây Sát Thương Phạm Vi Khi Chạm Đất.\n\n> 2 • <:albedoelement:985115845036503060> **Thuật Sáng Thế - Chế Tạo Mặt Trời**\n> *Loại Nham Hoa Này Có Đặc Tính Kỳ Lạ, Cũng Giống Như Thuật Giả Kim, Sinh Ra Từ Mặt Đất Nhưng Lại Luôn Hy Vọng Vươn Cao Lên Trời, Hóa Thành Vầng Thái Dương.*\n> Luyện thành Hoa Mặt Trời, Gây Sát Thương Phạm Vi Nguyên Tố Nham.\n> Hoa Mặt Trời - Có Những Đặc Tính Sau:\n> ·Lấy Hoa Mặt Trời Làm Tâm, Khi Địch Nằm Trong Khu Vực Nhận Sát Thương, Hoa Mặt Trời Sẽ Sinh Ra Hoa Khoảnh Khắc, Bung Nở Gây Sát Thương Phạm Vi Nguyên Tố Nham, Sát Thương Tính Theo Phòng Ngự Của Albedo.\n> ·Mỗi 2 Giây Chỉ Có Thể Sinh Ra 1 Hoa Khoảnh Khắc.\n> ·Khi Nhân Vật Đứng Trên Hoa Mặt Trời Sẽ Ngưng Tụ Sức Mạnh Nguyên Tố Nham, Hình Thành Đài Thủy Tinh Nâng Nhân Vật Lên. Cùng Lúc Chỉ Tồn Tại 1 Đài Thủy Tinh.\n> ·Cùng Lúc Chỉ Có Thể Tồn Tại 1 Hoa Mặt Trời Do Albedo Tạo Ra, Hoa Mặt Trời Được Coi Như Vật Tạo Nguyên Tố Nham.\n> Nhấn Giữ: Có Thể Điều Chỉnh Vị Trí Hiệu Lực Của Kỹ Năng.\n\n> 3 • <:albedoburst:985115914615787541> **Chiêu Giáng Sinh - Sóng Vỗ Đại Lục**\n> *Dưới Mệnh Lệnh Của Kreideprinz, Dòng Thủy Triều Của Địa Chất Cuồn Cuộn Dâng Trào.*\n> Dưới Chỉ Huy Của Albedo, Nham Tinh Bùng Nổ, Gây Sát Thương Phạm Vi Nguyên Tố Nham Về Phía Trước.\n> Khi Trong Trận Có Tồn Tại Hoa Mặt Trời Do Albedo Tạo Ra, Sẽ Nở Bung 7 Đóa Hoa Sinh Tử Trong Khu Vực Của Hoa Mặt Trời, Nở Rộ Rực Rỡ Đồng Thời Gây Sát Thương Phạm Vi Nguyên Tố Nham.\n> Sát Thương Bạo Phát Và Sát Thương Của Hoa Sinh Tử Sẽ Không Tạo Thành Hoa Khoảnh Khắc.\n\n<:LArrow:985422675306487829>**__Thiên Phú Cố Định__**<:RArrow:985422859994271744>\n> 1 • <:albedospecial1:985116288147935264> **Uy Lực Màu Vôi Trắng** - Hoa Khoảnh Khắc Sinh Ra Từ `Thuật Sáng Thế - Chế Tạo Mặt Trời` Sát Thương Gây Cho Kẻ Địch Có HP Dưới 50% Sẽ Tăng 25%. *(Require Đột Phá Lần 1)*\n\n> 2 • <:albedospecial2:985116368447868969> **Trí Tuệ Người Trong Bình** - Khi Thi Triển `Chiêu Giáng Sinh - Sóng Vỗ Đại Lục` Sẽ Tăng 125 Điểm Tinh Thông Nguyên Tố Cho Thành Viên Trong Đội Ở Gần, Kéo Dài 10s. *(Require Đột Phá Lần 4)*\n\n> 3 • <:weaponx2accent:985116426446708776> **Phát Hiện Của Thiên Tài** - Khi Ghép Nguyên Liệu Đột Phá Vũ Khí Sẽ Có 10% Tỷ Lệ Nhận x2 Thành Phẩm.",
    "<:LArrow:985422675306487829> **THÔNG TIN BUILD ĐỘI HÌNH CHO ALBEDO**<:RArrow:985422859994271744>\nVì Albedo Là Nhân Vật 5 <:5s:985115304961134612> Support Kiêm OFF - FIELD (Sub) DPS Nên Sẽ Là Nhân Vật Support Tốt Nhất Cho Những Nhân Vật Hệ Nham Như **Arataki Itto** Hay **Noelle** Và Các Chỉ Số Của Albedo Được Buff Dựa Vào DEF Nên Dễ Build Khi Bạn Có Các Thánh Di Vật Có Dòng Chính Là DEF. Khi Mở Thiên Phú Cố Định Thứ 2,  Khi Nhân Vật Trong Vùng Của `Thuật Sáng Thế - Chế Tạo Mặt Trời` Sẽ Buff 125 Điểm Tinh Thông Nguyên Tố. Còn Về Hướng OFF - FIELD (Sub) Thì Lợi Dụng Cột `Tâm Trái Đất` Của **Zhongli** Sẽ Gây DMG Xung Quanh `Thuật Sáng Thế - Chế Tạo Mặt Trời` \n\n<:LArrow:985422675306487829> **ĐỘI HÌNH PHÙ HỢP**<:RArrow:985422859994271744>\n`Main DPS`\n> **Arataki Itto** <:itto:985432070245453874> - **Noelle** <:noelle:985432482440695828>\n\n`Sub - DPS`\n> **Albedo** <:albedo:985117187188604978> \n\n`Support`\n> **Gorou** <:gorou:985432580037959681> \n\n`Support`\n> **Zhongli** <:zhongli:985432673398951936>",
               ]
//Nhét Link Ảnh Vô
const images = [
    "https://static.wikia.nocookie.net/genshin-impact/images/4/48/Nh%C3%A2n_V%E1%BA%ADt_Albedo_-_C%E1%BA%A7u_Nguy%E1%BB%87n_%C4%90%E1%BA%A7y_%C4%90%E1%BB%A7.png/revision/latest?cb=20220516134356&path-prefix=vi",
    "",
    "",
    "",
              ]
for (let g1 = 0; g1 < 4; ++g1) {
    const description = descriptions[g1]
    const image = images[g1]
    embeds.push(new MessageEmbed()
        .setTitle('<:albedothink:985135641257984020> **Albedo** <:geo:985117972660092979>')
        .setThumbnail('https://media.discordapp.net/attachments/985111306132684803/985134287571550248/unknown.png') 
        .setDescription(description)
        .setColor('#E4B400')
        .setImage(image)
        .setFooter({text: `Trang: ${g1+1}/4`, iconURL: ''}))
}

const getRow = (id) => {
const row = new MessageActionRow()
    row.addComponents(
        new MessageButton()
        .setCustomId('prev')
        .setStyle('SECONDARY')
        .setEmoji('⏪')
        .setLabel('Trang Trước')
        .setDisabled(pages[id] === 0)
    )
    row.addComponents(
        new MessageButton()
        .setCustomId('next')
        .setStyle('SECONDARY')
        .setEmoji('⏩')
        .setLabel('Trang Sau')
        .setDisabled(pages[id] === embeds.length - 1 )
    )
    return row
}
module.exports = {
    category: 'Geo',
    description: "Show Albedo's Stats",
    slash: true,
    callback: async ({user, interaction, channel}) => {
        const id = user.id
        pages[id] = pages[id] || 0

        const embed = embeds[pages[id1]]
        let collector

        const filter = (i) => {return i.user.id === user.id}
        const time = 1000*60*5

      await interaction.reply({
            embeds:[embed],
            components: [getRow(id)],
        })
        collector = channel.createMessageComponentCollector({ filter, time })
       await  collector.on('collect', (btnInt) => {
            if(!btnInt) {
                return
            }
            btnInt.deferUpdate()
            if(
                btnInt.customId !== 'prev' &&
                btnInt.customId !== 'next'
            )  {
                return
            }
            if(btnInt.customId === 'prev' && pages[id]>0) {
                --pages[id]
            } else if(
                btnInt.customId === 'next' && pages[id] < embeds.length -1
            )   {
                ++pages[id]
            }
             interaction.editReply({
                embeds: [embeds[pages[id]]],
                components: [getRow(id)],
            })  
        })
    },
}
 