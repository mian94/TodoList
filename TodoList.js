window.onload = function() {
    const todos = [
        { thing: '待办事件1', time: '2024/12/27 15:06:10' },
        { thing: '待办事件2', time: '2024/12/26 14:05:09' },
    ];

    const itemsPerPage = 5;
    let currentPage = 1;

    // 渲染分页后的待办事项
    function renderPaginatedTodos(todos,page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedTodos = todos.slice(start, end);

        const paginatedItemsDiv = document.getElementById('paginatedItems');
        paginatedItemsDiv.innerHTML = ''; // 清空现有内容

        paginatedTodos.forEach((todo, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'todo-item';
            itemDiv.id = `todo-${start + index}`;
            itemDiv.innerHTML = `
                <span class="thing">${todo.thing}</span>
                <span class="time">${todo.time}</span>
                <button class="edit-btn">编辑</button>
            `;
            paginatedItemsDiv.appendChild(itemDiv);

            // 为编辑按钮绑定点击事件
            itemDiv.querySelector('.edit-btn').onclick = function(e) {
                e.stopPropagation(); // 阻止事件冒泡，避免触发父级点击事件
                editTodo(start + index);
            };
        });

        updatePagination();
    }

    // 更新分页控件
    function updatePagination() {
        const totalPages = Math.ceil(todos.length / itemsPerPage);
        const paginationControls = document.getElementById('paginationControls');
        paginationControls.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.className = i === currentPage ? 'active' : '';
            pageLink.onclick = (e) => {
                e.preventDefault();
                currentPage = i;
                renderPaginatedTodos(currentPage);
            };
            paginationControls.appendChild(pageLink);
        }
    }

    // 初始化时渲染第一页
    renderPaginatedTodos(todos,currentPage);

    // 添加新的待办事项
    var btn04 = document.getElementById("btn04");
    btn04.onclick = function() {
        const newTodoThing = prompt('请输入新的待办事项：');

        if (newTodoThing && newTodoThing.trim()) {
            const currentTime = new Date().toLocaleString();
            todos.push({ thing: newTodoThing.trim(), time: currentTime });
            currentPage = 1;
            renderPaginatedTodos(todos,currentPage);
        } else if (newTodoThing !== null) {
            alert('请输入有效的待办事项');
        }
    }

    // 编辑待办事项
    function editTodo(index) {
        const changeTodoThing = prompt('请输入修改后的待办事件：', todos[index].thing);
        if (changeTodoThing && changeTodoThing.trim()) {
            const newTime = new Date().toLocaleString();
            // 更新 todos 数组中的对象
            todos[index] = { thing: changeTodoThing.trim(), time: newTime };
            // 重新渲染当前页
            renderPaginatedTodos(todos,currentPage);
        } else if (changeTodoThing !== null) {
            alert('请输入有效的待办事项');
        }
    }

    // 根据事件名称过滤待办事项
    function filterTodos(searchThing) {
        return todos.filter(todo => {
            // 检查事件名称是否匹配（模糊匹配）
            return !searchThing || todo.thing.toLowerCase().includes(searchThing.toLowerCase());
        });
    }

    // 处理搜索表单提交
    document.getElementById("btn03").addEventListener('click', function(e) {
        e.preventDefault();

        const searchThing = document.getElementById('searchThing').value.trim();

        // 根据事件名称过滤待办事项
        const filteredTodos = filterTodos(searchThing);

        // 重置当前页为第一页
        currentPage = 1;

        // 渲染过滤后的待办事项
        renderPaginatedTodos(filteredTodos,currentPage);

    });
}