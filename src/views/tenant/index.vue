<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus, Edit, Delete, Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  getTenantList,
  createTenant,
  updateTenant,
  deleteTenant,
} from '@/api/modules/tenant'

const loading = ref(false)
const tableData = ref<BusTenant[]>([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref<FormInstance>()
const formData = reactive<Partial<BusTenant>>({
  tenantId: undefined,
  tenantName: '',
  contactName: '',
  contactPhone: '',
  contactAddress: '',
  status: 1,
  memberType: '',
  loginName: '',
  loginPassword: '',
})

const rules: FormRules = {
  tenantName: [{ required: true, message: '请输入租户名称', trigger: 'blur' }],
  contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  loginName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
}

const statusOptions = [
  { label: '试用中', value: 0 },
  { label: '正常', value: 1 },
  { label: '禁用', value: 2 },
  { label: '已到期', value: 3 },
]

type TagType = 'primary' | 'success' | 'warning' | 'info' | 'danger'

const statusMap: Record<number, { text: string; type: TagType }> = {
  0: { text: '试用中', type: 'warning' },
  1: { text: '正常', type: 'success' },
  2: { text: '禁用', type: 'danger' },
  3: { text: '已到期', type: 'info' },
}

async function loadData() {
  loading.value = true
  try {
    tableData.value = await getTenantList()
  } catch {
    // 错误已由拦截器处理
  } finally {
    loading.value = false
  }
}

function resetForm() {
  Object.assign(formData, {
    tenantId: undefined,
    tenantName: '',
    contactName: '',
    contactPhone: '',
    contactAddress: '',
    status: 1,
    memberType: '',
    loginName: '',
    loginPassword: '',
  })
}

function handleAdd() {
  resetForm()
  dialogTitle.value = '新增租户'
  dialogVisible.value = true
}

function handleEdit(row: BusTenant) {
  Object.assign(formData, row)
  dialogTitle.value = '编辑租户'
  dialogVisible.value = true
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (formData.tenantId) {
        await updateTenant(formData)
        ElMessage.success('更新成功')
      } else {
        await createTenant(formData)
        ElMessage.success('新增成功')
      }
      dialogVisible.value = false
      loadData()
    } catch {
      // 错误已由拦截器处理
    }
  })
}

async function handleDelete(row: BusTenant) {
  await ElMessageBox.confirm('确认删除该租户？', '提示', {
    type: 'warning',
  })
  try {
    await deleteTenant(row.tenantId)
    ElMessage.success('删除成功')
    loadData()
  } catch {
    // 错误已由拦截器处理
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="page-container">
    <el-card shadow="never">
      <div class="page-toolbar">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增租户</el-button>
        <div>
          <el-button :icon="Search" @click="loadData">查询</el-button>
          <el-button :icon="Refresh" @click="loadData">刷新</el-button>
        </div>
      </div>

      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="tenantName" label="租户名称" min-width="120" />
        <el-table-column prop="contactName" label="联系人" width="100" />
        <el-table-column prop="contactPhone" label="联系电话" width="130" />
        <el-table-column prop="memberType" label="会员类型" width="100" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type">
              {{ statusMap[row.status]?.text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Edit" link @click="handleEdit(row as BusTenant)">编辑</el-button>
            <el-button size="small" :icon="Delete" link type="danger" @click="handleDelete(row as BusTenant)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="560px" destroy-on-close>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="90px">
        <el-form-item label="租户名称" prop="tenantName">
          <el-input v-model="formData.tenantName" placeholder="请输入租户名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="formData.contactName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="formData.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="联系地址" prop="contactAddress">
          <el-input v-model="formData.contactAddress" placeholder="请输入联系地址" />
        </el-form-item>
        <el-form-item label="会员类型" prop="memberType">
          <el-input v-model="formData.memberType" placeholder="请输入会员类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option
              v-for="opt in statusOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="登录账号" prop="loginName">
          <el-input v-model="formData.loginName" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="登录密码" prop="loginPassword">
          <el-input v-model="formData.loginPassword" type="password" placeholder="请输入登录密码" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  .page-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
}
</style>
